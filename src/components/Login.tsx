import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CheckCircledIcon } from '@radix-ui/react-icons'

interface Props {
  usernameHandle: string
  setLoading: any // TD typing
  setUser: any // TD typing
}

function LoginComponent(props: Props): JSX.Element {
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  async function handleFormSubmit(data: any) {
    props.setLoading(true)
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
        },
        credentials: 'include',
      })
      if (res.status === 200) {
        const user = await res.json()
        props.setUser(user)
        props.setLoading(false)
        navigate(`/user/${user?.username}/assets`)
      } else {
        props.setLoading(false)
        setError(true)
      }
    } catch (error) {
      // td
      console.log('error')
    }
  }

  return (
    <>
      <h3 style={{ color: 'grey' }}>
        1. GitHub Account <CheckCircledIcon />
      </h3>
      <h3>2. Kokan Account: Login</h3>
      <form
        onSubmit={handleSubmit((data) => handleFormSubmit(data))}
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
    </>
  )
}

export default LoginComponent
