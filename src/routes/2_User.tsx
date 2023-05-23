import { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate, Outlet, useParams } from 'react-router-dom'
import '../styles/2_User.css'
import brand_icon from '../assets/kokan_icon_w.png'

/* import components */
import ProfileAvatar from '../components/ProfileAvatar.tsx'
import UserInfo from '../components/UserInfo.tsx'

/* import modules */
import { authenticate } from '../modules/Authenticator'

/* context */
import { UserContext } from './1_App'

function User(): JSX.Element | undefined {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user, setUser } = useContext<any>(UserContext)
  let otherUser = useRef<any>() //
  const [auth, setAuth] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams() as any // throws error without

  // TD in this useeffect, first the user.username and the param should be compared ...
  // if they are not the same => query other user info and set that as a proxy for assets
  // if they are the same => authenticate
  // the requests/settings pages should redirect or show an 404 or so error page
  useEffect(() => {
    authenticate()
      .then((res) => {
        setAuth(res.status)
        if (res.status === false) {
          navigate('/login')
        }
        // only check if different, t
        if (id !== user?.username) {
          console.log('Other user dashboard')
          //fetch info about other user
          fetchOtherUser(id).then((res) => {
            const [userD] = res
            console.log(userD)
            otherUser.current = userD
          })
        }
      })
      .catch((err) => {
        console.log(err)
        navigate('/login')
      })
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

  console.log('otherUser:::')
  console.log(otherUser?.current)

  if (auth === true)
    return (
      <div id='user-container'>
        <div id='user-outlet'>
          {id === user?.username ? (
            <Outlet />
          ) : (
            <Outlet context={[otherUser?.current]} />
          )}
        </div>
        {id === user?.username ? (
          //<span>sdaf</span>
          <UserInfo />
        ) : (
          //<span>sdaf</span>
          <UserInfo otherUser={otherUser.current}/>
        )}
      </div>
    )
}

export default User

/*
          <div id='user-info-container'>
            <ProfileAvatar user={user}></ProfileAvatar>
            <div style={{ color: 'var(--main-color-yellow)' }}>
              {user?.username}
            </div>
            <div id='user-info'>
              <div>
                Current balance: {user?.kokans}
                <img
                  src={brand_icon}
                  alt='kokans'
                  height='20px'
                  style={{
                    position: 'relative',
                    top: '0.3rem',
                    marginLeft: '0.2rem',
                  }}
                />
              </div>
              <div>Total assets: {user?.asset_count}</div>
              <div>Assets on offer: {user?.asset_count}</div>
              <div>
                Pending incoming requests:{' '}
                {user?.requests_incoming_count_pending}
              </div>
              <div>
                Pending Outgoing requests:{' '}
                {user?.requests_outgoing_count_pending}
              </div>
              <div>Memmber since: {user.created}</div>
            </div>
          </div>

*/
