import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/1.1_Login.css'

import authenticate from '../components/Authenticator'

function Welcome(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    authenticate().then(flag => {
      setAuth(flag)
      navigate('/login')
    })
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    /*axios.post(
                "https://api.imgflip.com/caption_image",
                {
                    form: {
                        template_id: '181913649',
                        username: 'USERNAME',
                        password: 'PASSWORD',
                        text0: 'text0',
                        text1: 'text1',
                    },
                }
            )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });*/
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
    <>
      <div id='login-container'>
        {auth && <span>Welcome</span>}

      </div>
    </>
  )
}

export default Welcome
