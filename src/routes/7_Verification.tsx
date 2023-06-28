import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/* import styles */
import '../styles/7_Verification.css'

/* import components */
import Loading from '../components/Loading'

function EmailVerfication(): JSX.Element {
  const [loading, setLoading] = useState(true)
  const [verified, setVerified] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    getVerficationCode()
  }, [])

  async function getVerficationCode() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const verificationCodeParam = urlParams.get('vcode')
    const userCodeParam = urlParams.get('user')
    if (verificationCodeParam && userCodeParam) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}emails/signup/verify`,
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify({
              username: userCodeParam,
            }),
          },
        )
        if (res.status === 200) {
          setVerified(true)
        }
      } catch (err) {
        // TODO ERROR HANDLING
      }
    } else navigate('/')
    setLoading(false)
  }

  return (
    <div id='verification-container'>
      {!loading ? (
        <>
          <h2>Email Verfication</h2>
          <p>Thank you for varifying your E-Mail.</p>
          <p>You can now log in to your Kokan account.</p>
          <button
            onClick={() => {
              navigate('/login')
            }}
          >
            Login
          </button>
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default EmailVerfication
