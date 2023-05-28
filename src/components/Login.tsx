import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { getUser } from '../modules/Authenticator'

/* import components */
import Loading from './Loading'

/* import context */
import { UserContext } from '../routes/1_App'

interface Props {
  usernameHandle: string
  setUser: any // TD typing
}

function LoginComponent(props: Props): JSX.Element {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setUser } = useContext<any>(UserContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  async function handleLogin(data: any) { // TD typing
    setLoading(true)
    const { password } = data
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}auth`, {
        method: 'POST',
        body: JSON.stringify({
          username: props.usernameHandle,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
        credentials: 'include',
      })
      if (res.status === 200) {
        await getUser(setUser, navigate, 'dashboard').then(() => {
          setError(false)
        })
      } else {
        setError(true)
        setValue('password', '')
        setLoading(false)
      }
    } catch (err) {
      console.log('Login failed.')
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <div>
      {!loading ? (
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
            {error && <p className='validation-error'>Password incorrect.</p>}
            <br />
            <input type='submit' value='login'></input>
          </form>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default LoginComponent
