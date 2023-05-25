import { useState, ChangeEvent, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import './SignUp.css'

/* context */
import { UserContext } from '../routes/1_App'

interface Props {
  gitHubUser: any // TD typing
  setSignup: any // TD typing
  setLogin: any // TD typing
}

function SignUp(props: Props): JSX.Element {
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
    const { password, email } = data
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: props.gitHubUser.login,
          password: password,
          email: email,
          pictureURL: props.gitHubUser.avatar_url,
          kokans: 1,
        }),
      })
      props.setLogin(true)
      props.setSignup(false)
      navigate('/login')
      sendVerificationEmail(props.gitHubUser.login, email)
    } catch (error) {
      // TD errorHandling
    }
  }

  async function sendVerificationEmail(username: string, email: string) {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}auth/email`, {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          email: email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      if (res.status === 200) {
        // show sth that the email was sent
      }
    } catch (err) {
      // TD errorHandling
    }
    return
  }

  return (
    <>
      <h3 style={{ color: 'grey' }}>
        1. GitHub Account <CheckCircledIcon />
      </h3>
      <h3>2. Kokan Account: Sign Up</h3>
      <form onSubmit={handleSubmit((data) => handleFormSubmit(data))}>
        <div className='text-input'>
          <label htmlFor='username'>Username</label>
          <input
            name='username'
            type='text'
            defaultValue={props.gitHubUser.login}
            disabled={true}
          ></input>
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
              pattern: /^(.+)@(.+)$/,
            })}
            name='email'
            type='text'
          ></input>
          {errors.email && <p className='validation-error'>Email invalid.</p>}
          <br />
        </div>
        <input type='submit' value='sign up'></input>
      </form>
    </>
  )
}

export default SignUp
