import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/1.1_Login.css'

import authenticate from '../modules/Authenticator'

function Welcome(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [auth, setAuth] = useState(false)
  const navigate = useNavigate()

  // useEffect(() => {
  //   authenticate().then(flag => {
  //     setAuth(flag)
  //     if (flag === false) {navigate('/login')}
  //   })
  // }, [])

  useEffect(() => {
    navigate('/assets')
  }, [])

  return <div id='login-container'>{auth && <span>Welcome</span>}</div>
}

export default Welcome
