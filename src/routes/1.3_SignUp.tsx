import { useState, ChangeEvent, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import '../styles/1.3_SignUp.css'

/* context */
import { UserContext } from './1_App'

function SignUp(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { user, setUser } = useContext<any>(UserContext)
  const navigate = useNavigate()

  async function handleFormSubmit(data: any) {
    setLoading(true)
    const { username, password, email } = data
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}users`, {
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

      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}auth`, {
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
        if (res.status === 200) {
          const user = await res.json()
          setUser(user)
          setLoading(false)
          navigate(`/user/${user?.username}/assets`)
        } else {
          setLoading(false)
          setError(true)
        }}
      catch(err) {
        // errorHandling
      }
    } catch (error) {
      // TD errorHandling
    }
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
            name='username'
            type='text'
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
            name='password'
            type='password'
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
            name='email'
            type='text'
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
