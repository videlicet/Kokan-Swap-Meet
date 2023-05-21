import { useState, useEffect, useContext } from 'react'
import { useNavigate, Outlet, useParams } from 'react-router-dom'
import '../styles/2_User.css'
import brand_icon from '../assets/kokan_icon_w.png'

/* import components */
import ProfileAvatar from '../components/ProfileAvatar.tsx'

/* import modules */
import { authenticate } from '../modules/Authenticator'

/* context */
import { UserContext } from './1_App'

function User(): JSX.Element | undefined {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user, setUser } = useContext<any>(UserContext)
  const [auth, setAuth] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams() as any // throws error without

  // TH in this useeffect, first the user.username and the param should be compared ...
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
      })
      .catch((err) => {
        console.log(err)
        navigate('/login')
      })
  }, [])

  if (auth === true)
    return (
      <div id='user-container'>
        <div id='user-outlet'>
          <Outlet context={[user, setUser]} />
        </div>
        {id === user?.username && (
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
              <div>Assets: TD_sth.length()</div>
              <div>Incoming requests: TD_sth.length()</div>
              <div>Outgoing requests: TD_sth.length()</div>
            </div>
          </div>
        )}
      </div>
    )
}

export default User
