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
  const [newInfo, setNewInfo] = useState({
    username: user?.username,
    email: user?.email,
    password: user?.password,
    first_name: user?.first_name,
    last_name: user?.last_name,
  })

  const navigate = useNavigate()

  const DialogUsername = { title: 'Username', fields: { first: 'Username' } }
  const DialogPassword = { title: 'Password', fields: { first: 'Password' } }
  const DialogEmail = { title: 'Email', fields: { first: 'Email' } }
  const DialogName = {
    title: 'Name',
    fields: { first: 'First Name', second: 'Last Name' },
  }

  const [portalContainer, setPortalContainer] = useState(
    document.getElementById('user-settings'),
  )

  useEffect(() => {
    setPortalContainer(document.getElementById('user-settings'))
  }, [])

  function handleSubmit(changes: any) {
    console.log('submit triggered')
    console.log(changes)
    //const { value: username } = elements[0] as HTMLInputElement
    // setUsername('')
    // setPassword('')
  }

  // function handleChange(event: ChangeEvent<HTMLInputElement>) {
  //   setNewInfo({ ...newInfo, [`${event.target.name}`]: event.target.value })
  // }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event)
    //setNewInfo({ ...newInfo, [`${event.target.name}`]: event.target.value })
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
      <label htmlFor='username'>Username</label>
      <div className='info-box'>
        <span id='username'>{newInfo.username}</span>
        <DialogSettingsChange
          portalContainer={portalContainer}
          user={newInfo}
          content={DialogUsername}
          onSubmit={handleSubmit}
        />
      </div>

      <div>
        <label htmlFor='first_name'>First Name</label>
        <span> and </span>
        <label htmlFor='last_name'>Last Name</label>
      </div>
      <div className='info-box'>
          <span id='first_name'>{newInfo.first_name}</span>
          <span id='last_name'>{newInfo.last_name}</span>
        <DialogSettingsChange
          portalContainer={portalContainer}
          user={newInfo}
          content={DialogName}
          onSubmit={handleSubmit}
        />
      </div>

      <label htmlFor='email'>Email</label>
      <div className='info-box'>
        <span id='email'>{newInfo.email}</span>
        <DialogSettingsChange
          portalContainer={portalContainer}
          user={newInfo}
          content={DialogEmail}
          onSubmit={handleSubmit}
        />
      </div>

      <label htmlFor='password'>Password</label>
      <div className='info-box'>
        <span id='password'>{newInfo.password}</span>
        <DialogSettingsChange
          portalContainer={portalContainer}
          user={newInfo}
          content={DialogPassword}
          onSubmit={handleSubmit}
        />
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

/* TRASH 
  // const [username, setUsername] = useState(user?.username)
  // const [email, setEmail] = useState(user?.email)
  // const [password, setPassword] = useState(user?.password)
  // const [first_name, setfirst_name] = useState(user?.first_name)
  // const [last_name, setlast_name] = useState(user?.last_name)
   */
