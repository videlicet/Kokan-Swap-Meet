import { useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/2.1_User_Settings.css'
import brand_icon from '../assets/kokan_icon_w.png'

/* import components */
import AlertDialogDeleteAccount from '../components/AlertDialogDeleteAccount.tsx'
import DialogSettingsChange from '../components/DialogSettingsChange.tsx'

/* context */
import { UserContext } from './1_App'

import serverURL from '../../server_URL.ts'

function UserSettings(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const { user, setUser } = useContext<any>(UserContext)

  const navigate = useNavigate()

  const DialogUsername = {
    title: 'username',
    fields: { first: 'Username', second: 'none' },
  }
  const DialogPassword = {
    title: 'password',
    fields: { first: 'Password', second: 'none' },
  }
  const DialogEmail = {
    title: 'email',
    fields: { first: 'Email', second: 'none' },
  }
  const DialogName = {
    title: 'name',
    fields: { first: 'First Name', second: 'Last Name' },
  }

  const [portalContainer, setPortalContainer] = useState(
    document.getElementById('user-settings'),
  )

  useEffect(() => {
    setPortalContainer(document.getElementById('user-settings'))
  }, [])

  async function handleSubmit(changes: any) {
    console.log(changes)

    let updateReqBody = {}

    /* if first and last names are changed, the update in the req.body must be adapted*/
    if (changes.type !== 'name') {
      updateReqBody = {
        [`${changes.type}`]: changes.changes.first,
      }
    } else {
      updateReqBody = {
        first_name: changes.changes.first,
        last_name: changes.changes.second,
      }
    }

    const reqBody = {
      user: { _id: user._id },
      update: updateReqBody,
    }

    try {
      const res = await fetch(`${serverURL}users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(reqBody),
      })

      if (res.status === 200) {
        navigate(`/user/${user.username}/settings`)
      }
    } catch (err) {}
  }

  async function onDelete() {
    const res = await fetch(`${serverURL}users/${user._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ user: { _id: user._id } }),
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

  return (
    <div id='user-settings'>
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

      <div id='delete-account-box'>
        <AlertDialogDeleteAccount
          portalContainer={portalContainer}
          username={user?.username}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}

export default UserSettings
