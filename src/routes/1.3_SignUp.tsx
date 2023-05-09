import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from 'react'
import axios from 'axios'
import '../styles/1.3_SignUp.css'

import serverURL from '../../server_URL'

function SignUp(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const { elements } = event.target as HTMLFormElement
    const { value: username } = elements[0] as HTMLInputElement 
    const { value: password } = elements[1] as HTMLInputElement
    const { value: email } = elements[2] as HTMLInputElement  
    try {
      await axios.post(`${serverURL}users`, {
        username: username,
        password: password,
        email: email,
        pictureURL: "",
        kokans: 0,
        created: new Date
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Axios error: ' + error);
      } else {
        console.log('General error: ' + error);
      }
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
          <br />
        </div>
        <div className='text-input'>
          <label htmlFor='email'>E-Mail</label>
          <input
            onChange={handleChangeEmail}
            name='email'
            type='text'
            value={email}
          ></input>
          <br />
        </div>
        <input type='submit' value='sign up'></input>
      </form>
    </div>
  )
}

export default SignUp
