import { useState, useContext, useEffect, useRef } from 'react'
import '../styles/1.1_Login.css'

/* context */
import { UserContext } from './1_App'

/* components */
import LoginComponent from '../components/Login'
import SignUp from '../components/SignUp'

function Login(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)
  const [gitHubAuth, setGitHubAuth] = useState<boolean>(false)
  const [login, setLogin] = useState<boolean>(false)
  const [signup, setSignup] = useState<boolean>(false)
  const [gitHubUser, setGitHubUser] = useState<any>({}) // TD typing
  const { user, setUser } = useContext<any>(UserContext)

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const gitHubParam = urlParams.get('code')
    if (gitHubParam) {
      setLoading(true)
      /* get GitHub access_token */
      async function gitHubAuthenticate() {
        async function getAccessToken() {
          console.log('GitHub authentication:')
          try {
            const res = await fetch(
              `${
                import.meta.env.VITE_SERVER_URL
              }auth/gitHub?code=${gitHubParam}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Credentials': 'true',
                },
                credentials: 'include',
              },
            )
            if (res.status === 200) {
              console.log('–– GitHub authentication succeeded')
              setGitHubAuth(true)
            } else {
              console.log('–– GitHub authentication failed')
            }
            return res
          } catch (err) {
            console.log('– GitHub authentication failed')
            // TD error Handling what if failed -> create gitHub Account
          }
        }
        let res = await getAccessToken()
        if (res.status === 200) {
          /* get GitHub user information */
          async function getGitHubUser() {
            try {
              let userRes = await fetch(
                `${import.meta.env.VITE_SERVER_URL}auth/gitHub/user`,
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  credentials: 'include',
                },
              )
              if (userRes.status === 200) {
                let user = await userRes.json()
                setGitHubUser(user)
                return user
              }
            } catch (err) {
              console.log('No GitHub user found')
              setLoading(false)
            }
          }
          let user = await getGitHubUser()
          /*look in DB for user with GitHub username*/
          // USER-ROUTE
          try {
            const res = await fetch(
              `${import.meta.env.VITE_SERVER_URL}users/${user.login}`,
              {
                method: 'POST',
                body: JSON.stringify({
                  username: user.login,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
              },
            )
            if (res.status === 200) {
              setLogin(true)
            } else if (res.status === 404) {
              setSignup(true)
            }
            setLoading(false)
          } catch (err) {
            console.log('No GitHub user found')
          }
        }
        return setLoading(false)
      }
      gitHubAuthenticate()
    }
  }, [])

  /* GitHub */
  function loginWithGithub() {
    setLoading(true)
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${
        import.meta.env.VITE_GITHUB_CLIENT_ID
      }&scope=repo`, // scope: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps#requested-scopes-and-granted-scopes
    )
    setLoading(false)
  }

  return (
    <div id='login-container'>
      {!loading ? (
        <>
          <h2>Login</h2>
          {(!gitHubAuth && (
            <>
              <h3>1. GitHub Account</h3>
              <div style={{ paddingLeft: '1rem' }}>
                <p>
                  Please authenticate your GitHub account before proceeding.
                </p>
                <button onClick={loginWithGithub}>Authenticate</button>
                <span> &nbsp; &nbsp;OR &nbsp; &nbsp;</span>
                <button
                  onClick={() => {
                    window.location.assign(`https://github.com/join`)
                  }}
                >
                  Sign Up
                </button>
              </div>
              <h3 style={{ color: 'grey' }}>2. Kokan Account</h3>
            </>
          )) ||
            (login && (
              <LoginComponent
                usernameHandle={gitHubUser.login}
                setUser={setUser}
              />
            )) ||
            (signup && (
              <SignUp
                gitHubUser={gitHubUser}
                setSignup={setSignup}
                setLogin={setLogin}
              />
            ))}
        </>
      ) : (
        <span>Loading</span>
      )}
    </div>
  )
}

export default Login
