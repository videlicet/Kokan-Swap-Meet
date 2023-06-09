import { useState, useEffect, useContext } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

/* import styles */
import '../styles/2_User.css'

/* import components */
import UserInfo from '../components/UserInfo'
import Loading from '../components/Loading'

/* import modules */
import { authenticate } from '../modules/Authenticator'

/* import context */
import { UserContext } from './1_App'

function User(): JSX.Element | undefined {
  const [loading, setLoading] = useState<boolean>(true)
  const { user, setUser } = useContext<any>(UserContext)
  const [auth, setAuth] = useState<boolean>(false)
  const [loadingUserInfo, setLoadingUserInfo] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    setLoadingUserInfo(true)
    authenticate(user?._id)
      .then((res) => {
        setAuth(res.status)
        if (res.status === false) {
          return navigate('/login')
        }
        setUser(res.user)
      })
      .catch(() => {
        navigate('/login')
      })
    setInterval(() => setLoading(false), 1000)
    setLoadingUserInfo(false)
  }, [])

  if (auth === true)
    return (
      <>
        {!loading ? (
          <div id='user-container'>
            <div id='user-outlet'>
              <Outlet />
            </div>
            <UserInfo loadingUserInfo={loadingUserInfo} />
          </div>
        ) : (
          <Loading />
        )}
      </>
    )
}

export default User
