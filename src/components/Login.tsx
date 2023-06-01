import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

/* import components */
import { CheckCircledIcon } from '@radix-ui/react-icons'

/* import modules */
import { getUser } from '../modules/Authenticator'

/* import context */
import { UserContext } from '../routes/1_App'

interface Props {
  usernameHandle: string
  setUser: void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  passwordCorrect: boolean
  setPasswordCorrect: React.Dispatch<React.SetStateAction<boolean>>
}

function LoginComponent(props: Props): JSX.Element {
  const { setUser } = useContext<any>(UserContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  async function handleLogin(data: any) {
    // TODO typing
    props.setLoading(true)
    const { password } = data
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}auth`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({
          username: props.usernameHandle,
          password: password,
        }),
      })
      if (res.status === 200) {
        await getUser(setUser, navigate, 'dashboard').then(() => {
          props.setPasswordCorrect(true)
        })
      } else {
        props.setLoading(false)
        props.setPasswordCorrect(false)
        setValue('password', '')
      }
    } catch (err) {
      props.setLoading(false)
      console.log(err)
    }
  }

  return (
    <div>
      <div>
        <h3 style={{ color: 'grey' }}>
          1. GitHub Account <CheckCircledIcon />
        </h3>
        <h3>2. Kokan Account: Login</h3>
        <form
          onSubmit={handleSubmit((data) => handleLogin(data))}
          style={{ paddingLeft: '1rem' }}
        >
          <div className='text-input'>
            <label htmlFor='username'>Username</label>
            <input
              name='username'
              defaultValue={props.usernameHandle}
              type='text'
              disabled={true}
            ></input>

            <label htmlFor='password'>Password</label>
            <input
              {...register('password', {
                required: true,
                minLength: 7,
                maxLength: 50,
              })}
              name='password'
              type='password'
            ></input>
            {errors.password && (
              <p className='validation-error'>Password invalid.</p>
            )}
          </div>
          {!props.passwordCorrect && (
            <p className='validation-error'>Password incorrect.</p>
          )}
          <br />
          <input type='submit' value='login'></input>
        </form>
      </div>
    </div>
  )
}

export default LoginComponent
