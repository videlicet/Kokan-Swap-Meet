import {
  useState,
  useEffect,
  useContext,
  ChangeEvent,
  FormEvent,
  MouseEvent,
} from 'react'
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom'
import '../styles/1.1_Login.css'

/* context */
import { UserContext } from './1_App'

import serverURL from '../../server_URL'

function Login(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { user, setUser } = useContext<any>(UserContext)
  const navigate = useNavigate()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const { elements } = event.target as HTMLFormElement
    const { value: username } = elements[0] as HTMLInputElement
    const { value: password } = elements[1] as HTMLInputElement
    try {
      const res = await fetch(`${serverURL}auth`, {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      if (res.status == 201) {
        const user = await res.json()
        setUser(user)
        navigate(`/user/${user.username}/assets`)
      }
    } catch (error) {
      // td
    }
    setUsername('')
    setPassword('')
  }

  function handleChangeUsername(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
  }

  function handleChangePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  return (
    <div id='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='text-input'>
          <label htmlFor='username'>Username</label>
          <input
            onChange={handleChangeUsername}
            name='username'
            type='text'
            value={username}
          ></input>
        </div>
        <div className='text-input'>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChangePassword}
            name='password'
            type='password'
            value={password}
          ></input>
        </div>
        <br />
        <input type='submit' value='login'></input>
        <span> &nbsp; &nbsp;OR &nbsp; &nbsp;</span>
        <NavLink className='button-like' to='/sign-up'>
          sing up
        </NavLink>
      </form>
    </div>
  )
}

export default Login
