import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const otherUser = props.otherUser

  return (
    <div id='user-info-container'>
      <ProfileAvatar user={otherUser || user}></ProfileAvatar>
      <div style={{ color: 'var(--main-color-yellow)' }}>
        {props.otherUser?.username || user?.username}
        <a
          href={`https://github.com/${
            props.otherUser?.username || user?.username
          }`}
          target='_blank'
        >
          &nbsp;
          <ExternalLinkIcon />
        </a>
      </div>
      <div id='user-info'>
        {!props.otherUser && (
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
        )}
        <div>
          <span>
            Assets:{' '}
            {props.otherUser?.assets_count_offered ||
              user?.assets_count_offered}
            {!props.otherUser && <span>/{user?.assets_count}</span>}{' '}
            (offered{!props.otherUser && <span>/total</span>})
          </span>
        </div>
        {!props.otherUser && (
          <div>
            Pending incoming requests: {user?.requests_incoming_count_pending}
          </div>
        )}
        {!props.otherUser && (
          <div>
            Pending Outgoing requests: {user?.requests_outgoing_count_pending}
          </div>
        )}
        <div>Memmber since: {user?.created || user?.created}</div>
      </div>
    </div>
  )
}

export default UserInfo

/*

*/
