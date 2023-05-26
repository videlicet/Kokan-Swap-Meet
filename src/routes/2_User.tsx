import { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate, Outlet, useParams } from 'react-router-dom'
import '../styles/2_User.css'

/* import components */
import UserInfo from '../components/UserInfo.tsx'

/* import modules */
import { authenticate } from '../modules/Authenticator'

/* import context */
import { UserContext } from './1_App'

/* import modules */
import { fetchOtherUser, getUser } from '../modules/Authenticator'

function User(): JSX.Element | undefined {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user, setUser } = useContext<any>(UserContext)
  const [otherUser, setOtherUser] = useState()
  const [auth, setAuth] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams<string>() //as any // throws error without

  useEffect(() => {
    setLoading(true)
    if (id !== user?.username) {
      // TD use getUser util
      fetchOtherUser(id).then((res) => {
        setOtherUser(res)
        navigate(`assets`)
      })
    } else {
      getUser(setUser, navigate, undefined, id)
    }
    setAuth(true)
    setLoading(false)
  }, [])

  if (auth === true)
    return (
      <div id='user-container'>
        {!loading && (
          <>
            <div id='user-outlet'>
              <Outlet />
            </div>
            {id === user?.username ? ( // TD can't his be combined?
              <UserInfo />
            ) : (
              <UserInfo otherUser={otherUser} />
            )}
          </>
        )}
      </div>
    )
}

export default User
