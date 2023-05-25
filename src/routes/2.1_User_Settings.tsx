// @ts-nocheck
import { useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/2.1_User_Settings.css'

/* import components */
import AlertDialogDeleteAccount from '../components/AlertDialogDeleteAccount.tsx'
import DialogSettingsChange from '../components/DialogSettingsChange.tsx'
import TooltipInfo from '../components/Tooltip.tsx'
import AlertDialogImageUpload from '../components/AlertDialogImageUpload.tsx'

/* context */
import { UserContext, PortalContext } from './1_App'

/* toolTips */
const tooltipName = 'Your first and last names.'
const tooltipEmail = 'Your e-mail address for communication with Kokan.'
const tooltipPassword = 'Your password for logging in to Kokan.'
const tooltipProfilePicture =
  'Kokan uses your GitHub profile picture by default. You can upload a different profile picture here.'

/*modules*/
import { getUser, redirectDashboard } from '../modules/Authenticator'

function UserSettings(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user, setUser } = useContext<any>(UserContext)
  const { portalContainer } = useContext<any>(PortalContext)
  const { id } = useParams()
  const navigate = useNavigate()

  if (id !== user?.username) redirectDashboard(id, navigate)

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
    const reqBody = {
      user: { _id: user?._id },
      update: { changes: changes },
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}users/${user?._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(reqBody),
        },
      )
      getUser(setUser, navigate)
    } catch (err) {
      // TD errorHandling
    }
    setLoading(false)
  }

  async function onDelete() {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}users/${user?._id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ user: { _id: user?._id } }),
      },
    )
    if (res.status == 200) {
      /* delete user */
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}auth`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
        if (res.status === 200) {
          setUser()
          /* clear JWT cookie */
          // TD clear cookie
        }
      } catch (error) {
        // TD errorHandling
      }
      navigate('/')
    }
  }

  async function handleImageUpload() {
    // TD type
    /* get uploaded image */
    const inputElement = document?.getElementById('profile-picture')
    const file = inputElement?.files[0]
    if (1 === 1) {
      // TD logic
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
                },
                credentials: 'include',
                body: JSON.stringify(reqBody),
              },
            )
            if (res.status === 200) {
              inputElement.value = ''
              getUser(setUser, navigate)
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
