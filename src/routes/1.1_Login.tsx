import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/1.1_Login.css'

import serverURL from '../../server_URL'

function Login(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate  = useNavigate()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const { elements } = event.target as HTMLFormElement
    const { value: username } = elements[0] as HTMLInputElement 
    const { value: password } = elements[1] as HTMLInputElement
    try {
      const res = await axios.post(`${serverURL}login`, {
        username: username,
        password: password
      })
      if (res.status == 201) {navigate ('/user/1/assets')}
      console.log(res);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Axios error: ' + error);
      } else {
        console.log('General error: ' + error);
      }
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
    <>
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
              type='text'
              value={password}
            ></input>
          </div>
          <input type='submit' value='login'></input>
          <span> 	&nbsp; 	&nbsp;OR 	&nbsp; 	&nbsp;</span>
          <NavLink className='button-like' to='/sign-up'>
            sing up
          </NavLink>
        </form>
      </div>
    </>
  )
}

export default Login
