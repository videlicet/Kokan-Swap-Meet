import {
  useState,
  useEffect,
  useContext,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { Cloudinary } from '@cloudinary/url-gen'
import '../styles/2.1_User_Settings.css'
import brand_icon from '../assets/kokan_icon_w.png'

/* import components */
import AlertDialogDeleteAccount from '../components/AlertDialogDeleteAccount.tsx'
import DialogSettingsChange from '../components/DialogSettingsChange.tsx'
import { cloudinary_URL, cloudinary_cloud } from '../../cloudinary_URL.ts'

/* context */
import { UserContext } from './1_App'

import serverURL from '../../server_URL.ts'

function UserSettings(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null)

  const { user, setUser } = useContext<any>(UserContext)

  const navigate = useNavigate()

  const DialogUsername = {
    title: 'Username',
    fields: [
      {
        content: 'Username',
        inputName: 'username',
        defaultValue: user?.username,
        validation: { required: true, minLength: 4, maxLength: 15 },
        pattern: /^[a-z0-9_\-]+$/,
      },
    ],
  }
  const DialogPassword = {
    title: 'password',
    fields: [
      {
        content: 'Password',
        inputName: 'password',
        defaultValue: '',
        validation: { required: true, minLength: 8, maxLength: 50 },
      },
    ],
  }
  const DialogEmail = {
    title: 'Email',
    fields: [
      {
        content: 'Email',
        inputName: 'email',
        defaultValue: user?.email,
        validation: {
          required: true,
          minLength: 5,
          maxLength: 320,
          pattern: /^(.+)@(.+)$/,
        },
      },
    ],
  }
  const DialogName = {
    title: 'Name',
    fields: [
      {
        content: 'First Name',
        inputName: 'first_name',
        defaultValue: user?.first_name,
        validation: { required: true, maxLength: 30 },
      },
      {
        content: 'Last Name',
        inputName: 'last_name',
        defaultValue: user?.last_name,
        validation: { required: true, maxLength: 30 },
      },
    ],
  }

  const [portalContainer, setPortalContainer] = useState(
    document.getElementById('user-settings'),
  )

  useEffect(() => {
    setPortalContainer(document.getElementById('user-settings'))
  }, [])

  async function handleSubmit(changes: any) {
    const reqBody = {
      user: { _id: user?._id },
      update: changes,
    }

    try {
      const res = await fetch(`${serverURL}users/${user?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(reqBody),
      })

      if (res.status === 200) {
        navigate(`/user/${user?.username}/settings`)
      }
    } catch (err) {}
  }

  async function onDelete() {
    const res = await fetch(`${serverURL}users/${user?._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ user: { _id: user?._id } }),
    })
    if (res.status == 200) {
      /* clear JWT cookie */
      try {
        const res = await fetch(`${serverURL}auth`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
        if (res.status === 200) {
          setUser()
        }
      } catch (error) {
        // TD errorHandling
      }
      navigate('/')
    }
  }

  async function handleImageUpload(event: any) {
    // TD type
    event.preventDefault()

    /* get uploaded image */
    const inputElement = document?.getElementById('user-image')?.files[0]
    if (event.target.elements[0].baseURI) {
      /* send image to cloudinary */
      const formData = new FormData()
      formData.append('file', inputElement)
      formData.append('upload_preset', 'profile-pictures')

      try {
        const image = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudinary_cloud}/upload`,
          {
            method: 'POST',
            body: formData,
          },
        )

        if (image) {
          /* update profile picture URL for user in DB  */
          const { secure_url: image_URL } = await image.json()

          const reqBody = {
            user: { _id: user?._id },
            update: { changes: { pictureURL: image_URL } },
          }

          try {
            const res = await fetch(`${serverURL}users/${user?._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify(reqBody),
            })

            if (res.status === 200) {
              navigate(`/user/${user?.username}/settings`)
            }
          } catch (err) {}
        }
      } catch (err) {
        // TD errorHandling
      }
    }
  }

  return (
    <div id='user-settings'>
      {user && (
        <>
          <div>
            <label htmlFor='username'>Username</label>
            <div className='info-box'>
              <span id='username'>{user?.username}</span>
              <DialogSettingsChange
                portalContainer={portalContainer}
                user={user}
                content={DialogUsername}
                onSubmit={handleSubmit}
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor='first_name'>First Name</label>
              <span> and </span>
              <label htmlFor='last_name'>Last Name</label>
            </div>
            <div className='info-box' style={{ gridTemplateRows: '1fr 1fr' }}>
              <div
                style={{
                  display: 'grid',
                  gap: '1rem',
                  gridRowStart: '1',
                  gridRowEnd: '3',
                }}
              >
                <span id='first_name'>{user?.first_name}</span>
                <span id='last_name'>{user?.last_name}</span>
              </div>
              <DialogSettingsChange
                portalContainer={portalContainer}
                user={user}
                content={DialogName}
                onSubmit={handleSubmit}
              />
            </div>
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <div className='info-box'>
              <span id='email'>{user?.email}</span>
              <DialogSettingsChange
                portalContainer={portalContainer}
                user={user}
                content={DialogEmail}
                onSubmit={handleSubmit}
              />
            </div>
          </div>

          <div>
            <div className='info-box'>
              <label htmlFor='password'>Password</label>
              <DialogSettingsChange
                portalContainer={portalContainer}
                user={user}
                content={DialogPassword}
                onSubmit={handleSubmit}
              />
            </div>
          </div>

          <form onSubmit={handleImageUpload}>
            <label htmlFor='user-image'>User Image</label>
            <div className='info-box'>
              <input
                name='user-image'
                type='file'
                id='user-image'
                accept='.png,.jpg,.jpeg'
              />
              <button type='submit'>Upload</button>
            </div>
          </form>

          <div id='delete-account-box'>
            <AlertDialogDeleteAccount
              portalContainer={portalContainer}
              username={user?.username}
              onDelete={onDelete}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default UserSettings
