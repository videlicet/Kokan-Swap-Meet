import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import '../styles/1.3_SignUp.css'

import serverURL from '../../server_URL'

function SignUp(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  async function handleFormSubmit(event: any) {
    const username = event.username
    const password = event.password
    const email = event.email
    try {
      await fetch(`${serverURL}users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          pictureURL: '',
          kokans: 0,
          created: new Date(),
        }),
      })
      navigate('/login')
    } catch (error) {
      // TD errorHandling
    }
    setUsername('')
    setPassword('')
    setEmail('')
  }

  function handleChangeUsername(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
  }

  function handleChangePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function handleChangeEmail(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  return (
    <div id='signup-container'>
      <h2>Sign Up</h2>
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
          {errors.username && <p className='validation-error'>Username invalid.</p>}
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
            <p className='validation-error'>Password invalid.</p>
          )}
          <br />
        </div>
        <div className='text-input'>
          <label htmlFor='email'>E-Mail</label>
          <input
            {...register('email', {
              required: true,
              minLength: 5,
              maxLength: 320,
              pattern: /^(.+)@(.+)$/
            })}
            onChange={handleChangeEmail}
            name='email'
            type='text'
            value={email}
          ></input>
          {errors.email && <p className='validation-error'>Email invalid.</p>}
          <br />
        </div>
        <input type='submit' value='sign up'></input>
      </form>
    </div>
  )
}

export default SignUp
