import { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate, Outlet, useParams } from 'react-router-dom'
import '../styles/2_User.css'

/* import components */
import UserInfo from '../components/UserInfo.tsx'

/* import modules */
import { authenticate } from '../modules/Authenticator'

/* context */
import { UserContext } from './1_App'

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
    authenticate()
      .then((res) => {
        setAuth(res.status)
        if (res.status === false) {
          navigate('/login')
        }
        /* fetch info about other user if 
        url param (id) and username differs */
        if (id !== user?.username) {
          fetchOtherUser(id).then((res) => {
            const [userD] = res
            setOtherUser(userD)
            navigate(`assets`)
          })
        }
      })
      .catch((err) => {
        console.log(err)
        navigate('/login')
      })
    setLoading(false)

    // TD move this function to a utils
    async function fetchOtherUser(id: string) {
      let res = await fetch(`${import.meta.env.VITE_SERVER_URL}users/${id}`, {
        method: 'POST',
        body: JSON.stringify({
          username: id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      if (res.status === 200) {
        let otherUser = await res.json()
        return otherUser
      }
    }
  }, [])

  if (auth === true)
    return (
      <div id='user-container'>
        {!loading && (
          <>
            <div id='user-outlet'>
              {id === user?.username ? ( // TD can't his be combined?
                <Outlet />
              ) : (
                <Outlet context={[otherUser]} />
              )}
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
