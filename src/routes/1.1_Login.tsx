import { useState, useContext, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/1.1_Login.css'

/* context */
import { UserContext } from './1_App'

import serverURL from '../../server_URL'

function Login(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { user, setUser } = useContext<any>(UserContext)
  const navigate = useNavigate()

  async function handleFormSubmit(data: any) {
    const { username, password } = data
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
      <form onSubmit={handleSubmit((data) => handleFormSubmit(data))}>
        <div className='text-input'>
          <label htmlFor='username'>Username</label>
          <input
            {...register('username', {
              required: true,
              minLength: 4,
              maxLength: 15,
            })}
            onChange={handleChangeUsername}
            name='username'
            type='text'
            value={username}
          ></input>
          {errors.username && (
            <p className='validation-error'>Username invalid.</p>
          )}
        </div>
        <div className='text-input'>
          <label htmlFor='password'>Password</label>
          <input
            {...register('password', {
              required: true,
              minLength: 8,
              maxLength: 50,
            })}
            onChange={handleChangePassword}
            name='password'
            type='password'
            value={password}
          ></input>
          {errors.password && (
            <p className='validation-error'>Password invalid</p>
          )}
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
