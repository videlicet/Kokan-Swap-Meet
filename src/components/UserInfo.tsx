import { useState, useContext, useEffect } from 'react'
import '../styles/2_User.css'
import brand_icon from '../assets/kokan_icon_w.png'

/* import components */
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import ProfileAvatar from '../components/ProfileAvatar'

/* context */
import { UserContext } from '../routes/1_App'

interface Props {
  otherUser?: any // TD type
}

function UserInfo(props?: Props): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user, setUser } = useContext<any>(UserContext)
  const [renderTrigger, setRenderTrigger] = useState(false)
  const otherUser = props?.otherUser

  useEffect(() => {
    setRenderTrigger(!renderTrigger)
  }, [])

  return (
    <div id='user-info-container'>
      <ProfileAvatar user={otherUser || user}></ProfileAvatar>
      <div style={{ color: 'var(--main-color-yellow)' }}>
        {otherUser?.username || user?.username}
        <a
          href={`https://github.com/${otherUser?.username || user?.username}`}
          target='_blank'
        >
          &nbsp;
          <ExternalLinkIcon />
        </a>
      </div>
      <div id='user-info'>
        {!otherUser && (
          <div>
            <span>Kokans: {user?.kokans}</span>
            {user?.kokans_pending > 0 && <span> / {user?.kokans_pending} </span>}
            <img
              src={brand_icon}
              alt='kokans'
              height='20px'
              style={{
                position: 'relative',
                top: '0.3rem',
                marginLeft: '0.2rem',
                zIndex: 0,
              }}
            />
            {user?.kokans_pending > 0 && (
              <span style={{ color: 'grey' }}> (current / pending)</span>
            )}
          </div>
        )}
        <div>
          <span>
            Assets:{' '}
            {otherUser?.assets_count_offered || user?.assets_count_offered}
            {!otherUser && <span> / {user?.assets_count}</span>}
            <span style={{ color: 'grey' }}>
              {' '}
              (offered
              {!otherUser && <span> / total</span>})
            </span>
          </span>
        </div>
        {!otherUser && (
          <span>
            Pending requests: {user?.requests_incoming_count_pending} /{' '}
            {user?.requests_outgoing_count_pending}{' '}
            <span style={{ color: 'grey' }}>(incoming / outgoing)</span>
          </span>
        )}
        <div>Member since {otherUser?.created || user?.created}</div>
      </div>
    </div>
  )
}

export default UserInfo

/*

*/
