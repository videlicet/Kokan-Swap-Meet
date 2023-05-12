import { useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react'
import { NavLink, useOutletContext } from 'react-router-dom'
import '../styles/2.1_User_Settings.css'
import brand_icon from '../assets/kokan_icon_w.png'

/* import components */
import AlertDialogDeleteAccount from '../components/AlertDialogDeleteAccount.tsx'

/* context */
import { UserContext } from './1_App'

function UserSettings(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('sdfsf')
  const [password, setPassword] = useState('')
  //const [user, setUser] = useOutletContext() as any[]
  const {user, setUser} = useContext<any>(UserContext)

  const [portalContainer, setPortalContainer] = useState(
    document.getElementById('user-settings'),
  )

  useEffect(() => {
    setPortalContainer(document.getElementById('user-settings'))
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    /*axios.post(
                "https://api.imgflip.com/caption_image",
                {
                    form: {
                        template_id: '181913649',
                        username: 'USERNAME',
                        password: 'PASSWORD',
                        text0: 'text0',
                        text1: 'text1',
                    },
                }
            )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });*/
    setUsername('')
    setPassword('')
  }

  function handleChangeUsername(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
  }

  function onDelete() {
    console.log('delete clicked')
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
