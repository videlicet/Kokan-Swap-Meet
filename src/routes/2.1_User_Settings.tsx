import { useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/2.1_User_Settings.css'
import brand_icon from '../assets/kokan_icon_w.png'

/* import components */
import AlertDialogDeleteAccount from '../components/AlertDialogDeleteAccount.tsx'

/* context */
import { UserContext } from './1_App'

import serverURL from '../../server_URL.ts'

function UserSettings(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('sdfsf')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { user, setUser } = useContext<any>(UserContext)

  const [portalContainer, setPortalContainer] = useState(
    document.getElementById('user-settings'),
  )

  useEffect(() => {
    setPortalContainer(document.getElementById('user-settings'))
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setUsername('')
    setPassword('')
  }

  function handleChangeUsername(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
  }

  async function onDelete() {
    console.log('onDelete triggered')
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
      <form>
        <label>Username</label>
        <div className='info-box'>
          <span className='fixed-text'>{user?.username}</span>
          <input type='submit' value='Change' />
        </div>
      </form>

      <form>
        <label>Email</label>
        <div className='info-box'>
          <span className='fixed-text'>{user?.email}</span>
          <input type='submit' value='Change' />
        </div>
      </form>

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
