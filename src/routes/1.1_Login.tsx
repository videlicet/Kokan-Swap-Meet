import { useState, useContext, ChangeEvent, CSSProperties } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/1.1_Login.css'

/* context */
import { UserContext } from './1_App'

function Login(): JSX.Element {
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
    const { username, password } = data

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
      }
    } catch (error) {
      // td
      console.log('error')
    }
  }

  return (
    <div id='login-container'>
      {!loading ? (
        <>
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
                name='username'
                type='text'
              ></input>
              {errors.username && (
                <p className='validation-error'>Username invalid.</p>
              )}

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
            {error && <p className="validation-error">Username or Password incorrect.</p>}
            <br />
            <input type='submit' value='login'></input>
            <span> &nbsp; &nbsp;OR &nbsp; &nbsp;</span>
            <NavLink className='button-like' to='/sign-up'>
              sing up
            </NavLink>
          </form>
        </>
      ) : ( <span>Loading</span>
      )}
    </div>
  )
}

export default Login
