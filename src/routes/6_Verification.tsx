import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/5_About.css'

function EmailVerfication(): JSX.Element {
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
          `${import.meta.env.VITE_SERVER_URL}auth/email/verification`,
          {
            method: 'POST',
            body: JSON.stringify({
              username: userCodeParam,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          },
        )
        if (res.status === 200) {
          const { success } = await res.json()
          console.log(success)

          const reqBody = {
            user: { username: userCodeParam },
            update: { changes: { email_verified: true } },
          }
          /* update email_verfied status in DB */
          try {
            const res = await fetch(
              `${import.meta.env.VITE_SERVER_URL}users/${userCodeParam}`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(reqBody),
              },
            )
          } catch (err) {
            // TD errorHanlding
          }
          setVerified(true)
        }
      } catch (err) {
        // TD errorHandling
      }
    } else navigate('/')
  }

  return (
    <>
      <div id='about-container'>
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
        <span>&nbsp;&nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <button
          onClick={() => {
            window.close()
          }}
        >
          Close Tab
        </button>
      </div>
    </>
  )
}

export default EmailVerfication
