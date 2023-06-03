import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

/* import styles */
import './SignUp.css'

/* import components */
import { CheckCircledIcon } from '@radix-ui/react-icons'

/* types */
interface Props {
  gitHubUser: any // TODO typing
  setSignup: React.Dispatch<React.SetStateAction<boolean>>
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

function SignUp(props: Props): JSX.Element {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()

  async function handleFormSubmit(data: any) {
    setLoading(true)
    const { password, email } = data
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}users`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({
          username: props.gitHubUser.login,
          password: password,
          email: email,
          pictureURL: props.gitHubUser.avatar_url,
          kokans: 1,
          kokans_pending: 0
        }),
      })
      props.setLogin(true)
      props.setSignup(false)
      navigate('/login')

      console.log(props.gitHubUser.login)
      console.log(email)
      sendVerificationEmail(props.gitHubUser.login, email)
    } catch (err) {
      console.log(err)
    }
  }

  async function sendVerificationEmail(username: string, email: string) {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}emails/signup/submit`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({
          username: username,
          email: email,
        }),
      })
      if (res.status === 200) {
        // TODO show sth that the email was sent
      }
    } catch (err) {
      console.log(err)
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
            type='email'
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
