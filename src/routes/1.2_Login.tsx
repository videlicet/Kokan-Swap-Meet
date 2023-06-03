import { useState, useContext, useEffect } from 'react'
import '../styles/1.1_Login.css'

/* context */
import { UserContext } from './1_App'

/* components */
import LoginComponent from '../components/Login'
import SignUp from '../components/SignUp'
import Loading from '../components/Loading'

function Login(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)
  const [gitHubAuth, setGitHubAuth] = useState<boolean>(false)
  const [login, setLogin] = useState<boolean>(false)
  const [signup, setSignup] = useState<boolean>(false)
  const [passwordCorrect, setPasswordCorrect] = useState<boolean>(true)
  const [gitHubUser, setGitHubUser] = useState<any>({}) // TODO typing
  const { user, setUser } = useContext<any>(UserContext) // TODO typing

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const gitHubParam = urlParams.get('code')
    if (gitHubParam) {
      setLoading(true)
      /* get GitHub access_token */
      async function gitHubAuthenticate() {
        async function getAccessToken() {
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
              setGitHubAuth(true)
            } else {
              setGitHubAuth(false)
            }
            return res
          } catch (err) {
            // TODO error Handling what if failed -> create gitHub Account
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
                  credentials: 'include',
                  headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true',
                  },
                },
              )
              if (userRes.status === 200) {
                const user = await userRes.json()
                setGitHubUser(user)
                return user
              }
            } catch (err) {
              console.log('No GitHub user found.')
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
                method: 'GET',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Credentials': 'true',
                },
              },
            )
            if (res.status === 200) {
              setLogin(true)
            } else if (res.status === 404) {
              setSignup(true)
            }
            setLoading(false)
          } catch (err) {
            console.log('No GitHub user found in Kokan database')
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
        <div>
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
                setLoading={setLoading}
                passwordCorrect={passwordCorrect}
                setPasswordCorrect={setPasswordCorrect}
              />
            )) ||
            (signup && (
              <SignUp
                gitHubUser={gitHubUser}
                setSignup={setSignup}
                setLogin={setLogin}
              />
            ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Login
