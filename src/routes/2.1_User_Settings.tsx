// @ts-nocheck
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/2.1_User_Settings.css'

/* import components */
import AlertDialogDeleteAccount from '../components/AlertDialogDeleteAccount.tsx'
import DialogSettingsChange from '../components/DialogSettingsChange.tsx'
import TooltipInfo from '../components/Tooltip.tsx'
import AlertDialogImageUpload from '../components/AlertDialogImageUpload.tsx'

/* impmort context */
import { UserContext, PortalContext } from './1_App'

/* import modules */
import { getUser } from '../modules/Authenticator'

/* toolTips */
const tooltipName = 'Your first and last names.'
const tooltipEmail = 'Your e-mail address for communication with Kokan.'
const tooltipPassword = 'Your password for logging in to Kokan.'
const tooltipProfilePicture =
  'Kokan uses your GitHub profile picture by default. You can upload a different profile picture here.'

function UserSettings(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user, setUser } = useContext<any>(UserContext)
  const { portalContainer } = useContext<any>(PortalContext)
  const navigate = useNavigate()

  /* dialog contents */
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

  async function handleSettingsChange(data: any) {
    setLoading(true)
    const { data: changes } = data
    console.log(changes)
    const reqBody = {
      user: { _id: user?._id },
      update: { changes: changes },
    }

    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}users/${user?._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify(reqBody),
      })
      getUser(setUser, navigate)
    } catch (err) {
      console.log(err)
      // TODO errorHandling
    }
    setLoading(false)
  }

  async function onDelete() {
    /* delete assets that only this user owns */
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}assets`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({ user: { _id: user?._id } }),
      })
    } catch (err) {
      console.log(err)
    }
    /* delete user */
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}users/${user?._id}`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({ user: { _id: user?._id } }),
        },
      )
      if (res.status == 200) {
        /* clear cookies */
        try {
          const res = await fetch(`${import.meta.env.VITE_SERVER_URL}auth`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
            },
          })
          if (res.status === 200) {
            setUser()
          }
        } catch (err) {
          console.log(err)
        }
      }
    } catch (err) {
      console.log(err)
    }
    navigate('/')
  }

  async function handleImageUpload() {
    /* get uploaded image */
    const inputElement = document?.getElementById('profile-picture')
    const file = inputElement?.files[0]
    // TODO logic
    /* send image to cloudinary */
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'profile-pictures')
    try {
      const image = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD
        }/upload`,
        {
          /* do not modify this request, it works even though "credentials: 'include'" and "'Access-Control-Allow-Credentials': 'true'" isn't set */
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
          const res = await fetch(
            `${import.meta.env.VITE_SERVER_URL}users/${user?._id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
              },
              credentials: 'include',
              body: JSON.stringify(reqBody),
            },
          )
          if (res.status === 200) {
            inputElement.value = ''
            getUser(setUser, navigate)
          }
        } catch (err) {
          console.log(err)
          // TODO errorHan
        }
      }
    } catch (err) {
      console.log(err)
      // TODO errorHandling
    }
  }

  return (
    <div id='user-settings'>
      {loading ? (
        <span>Loading</span>
      ) : (
        <>
          {user && (
            <>
              <h2>Settings</h2>
              <div id='user-settings-container'>
                <div>
                  <div className='setting-containter'>
                    <div>
                      <label htmlFor='first_name'>First Name</label>
                      <span> and </span>
                      <label htmlFor='last_name'>Last Name</label>
                      <TooltipInfo content={tooltipName} />
                    </div>
                    <div
                      className='info-box'
                      style={{ gridTemplateRows: '1fr 1fr' }}
                    >
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
                        onSubmit={handleSettingsChange}
                      />
                    </div>
                  </div>

                  <div className='setting-containter'>
                    <label htmlFor='email'>
                      Email
                      <TooltipInfo content={tooltipEmail} />
                    </label>
                    <div className='info-box'>
                      <span id='email'>{user?.email}</span>
                      <DialogSettingsChange
                        portalContainer={portalContainer}
                        user={user}
                        content={DialogEmail}
                        onSubmit={handleSettingsChange}
                      />
                    </div>
                    {!user?.email_verified ? (
                      <span className='verification green'>verified email</span>
                    ) : (
                      <div>
                        <span className='verification yellow'>
                          unverified email
                        </span>
                        <button>verify</button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className='setting-containter'>
                    <label htmlFor='password'>
                      Password
                      <TooltipInfo content={tooltipPassword} />
                    </label>
                    <div className='info-box'>
                      <span id='password'>●●●●●●●●●●●●●●</span>
                      <DialogSettingsChange
                        portalContainer={portalContainer}
                        user={user}
                        content={DialogPassword}
                        onSubmit={handleSettingsChange}
                      />
                    </div>
                  </div>

                  <form id='image-upload' className='setting-containter'>
                    <label htmlFor='profile-picture'>
                      Profile Picture
                      <TooltipInfo content={tooltipProfilePicture} />
                    </label>
                    <div className='info-box'>
                      <input
                        name='profile-picture'
                        type='file'
                        id='profile-picture'
                        accept='.png,.jpg,.jpeg'
                      />
                      <AlertDialogImageUpload onConfirm={handleImageUpload} />
                    </div>
                  </form>
                </div>
              </div>

              <div id='delete-account-box' className='setting-containter'>
                <AlertDialogDeleteAccount
                  portalContainer={portalContainer}
                  username={user?.username}
                  onDelete={onDelete}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default UserSettings
