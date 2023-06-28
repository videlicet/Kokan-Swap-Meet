import { useState, useEffect, useContext } from 'react'
import { useNavigate, Outlet, useParams } from 'react-router-dom'

/* import styles */
import '../styles/2_User.css'

/* import components */
import UserInfo from '../components/UserInfo'
import Loading from '../components/Loading'

/* import context */
import { UserContext } from './1_App'

/* import modules */
import { fetchOtherUser } from '../modules/Authenticator'

function UsersDetail(): JSX.Element | undefined {
  const [loading, setLoading] = useState<boolean>(true)
  const { user, setUser } = useContext<any>(UserContext)
  const [otherUser, setOtherUser] = useState<any>()
  const [loadingUserInfo, setLoadingUserInfo] = useState<boolean>(true)
  const navigate = useNavigate()
  const { id } = useParams<string>()

  useEffect(() => {
    console.log(user)
    setLoading(true)
    setLoadingUserInfo(true)
    fetchOtherUser(id).then((user) => {
      setOtherUser(user)
      navigate(`assets`)
      return setLoading(false)
    })
    setLoading(false)
    setLoadingUserInfo(false)
  }, [])

  return (
    <>
      {!loading ? (
        <div id='user-container'>
          <div id='user-outlet'>
            <Outlet />
          </div>
          <UserInfo otherUser={otherUser} loadingUserInfo={loadingUserInfo} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default UsersDetail
