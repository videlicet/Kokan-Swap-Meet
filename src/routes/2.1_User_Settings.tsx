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

  const { user, setUser } = useContext<any>(UserContext)
  const [newInfo, setNewInfo] = useState({
    username: user?.username,
    email: user?.email,
    password: user?.password,
    first_name: user?.first_name,
    last_name: user?.last_name
  })

  const navigate = useNavigate()

  const [portalContainer, setPortalContainer] = useState(
    document.getElementById('user-settings'),
  )

  useEffect(() => {
    setPortalContainer(document.getElementById('user-settings'))
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // setUsername('')
    // setPassword('')
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewInfo({...newInfo, [`${event.target.name}`]: event.target.value})
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
        <label htmlFor='username'>Username</label>
        <div className='info-box'>
          <input
            id='username'
            name='username'
            type='text'
            value={newInfo.username}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange(event)
            }
          />
          <input type='submit' value='Change' />
        </div>
      </form>

      <form>
        <label htmlFor='first_name'>First Name</label>
        <span> and </span>
        <label htmlFor='last_name'>Last Name</label>
        <div className='info-box'>
          <input
            id='first_name'
            name='first_name'
            type='text'
            value={newInfo.first_name}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange(event)
            }
          />
          <input
            id='last_name'
            name='last_name'
            type='text'
            value={newInfo.last_name}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange(event)
            }
          />
          <input type='submit' value='Change' />
        </div>
      </form>

      <form>
        <label htmlFor='email'>Email</label>
        <div className='info-box'>
          <input
            id='email'
            name='email'
            type='text'
            value={newInfo.email}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange(event)
            }
          />
          <input type='submit' value='Change' />
        </div>
      </form>

      <form>
        <label htmlFor='password'>Password</label>
        <div className='info-box'>
          <input
            id='password'
            name='password'
            type='password'
            value={newInfo.password}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange(event)
            }
          />
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


/* TRASH 
  // const [username, setUsername] = useState(user?.username)
  // const [email, setEmail] = useState(user?.email)
  // const [password, setPassword] = useState(user?.password)
  // const [first_name, setfirst_name] = useState(user?.first_name)
  // const [last_name, setlast_name] = useState(user?.last_name)
   */