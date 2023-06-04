import { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate, Outlet, useParams } from 'react-router-dom'

/* import styles */
import '../styles/2_User.css'

/* import components */
import UserInfo from '../components/UserInfo'
import Loading from '../components/Loading'

/* import modules */
import { authenticate } from '../modules/Authenticator'

/* import context */
import { UserContext } from './1_App'

/* import modules */
import { fetchOtherUser } from '../modules/Authenticator'

function User(): JSX.Element | undefined {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState(null)
  const { user, setUser } = useContext<any>(UserContext)
  const [otherUser, setOtherUser] = useState<any>()
  const [auth, setAuth] = useState<boolean>(false)
  const [loadingUserInfo, setLoadingUserInfo] = useState<boolean>(true)
  const navigate = useNavigate()
  const { id } = useParams<string>()
  const idCurrent = useRef<string>()

  useEffect(() => {
    setLoading(true)
    setLoadingUserInfo(true)
    authenticate(user?._id)
      .then((res) => {
        setAuth(res.status)
        if (res.status === false) {
          return navigate('/login')
        }
        /* fetch info about other user if url param (id) and username differs */
        if (res.status === true) {
          setUser(res.user)
          idCurrent.current = res.user.username
        }
        if (idCurrent.current !== id) {
          fetchOtherUser(id).then((user) => {
            setOtherUser(user)
            navigate(`assets`)
          })
        }
      })
      .catch((err) => {
        // TODO ERROR HANDLING
        navigate('/login')
      })
    setLoadingUserInfo(false)
    setLoading(false)
  }, [])

  if (auth === true)
    return (
      <div id='user-container'>
        {!loading ? (
          <>
            <div id='user-outlet'>
              <Outlet />
            </div>
            {id === user?.username ? ( // TODO can't his be combined?
              <UserInfo loadingUserInfo={loadingUserInfo} />
            ) : (
              <UserInfo
                otherUser={otherUser}
                loadingUserInfo={loadingUserInfo}
              />
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    )
}

export default User
