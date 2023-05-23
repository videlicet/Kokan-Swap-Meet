import { useState, useContext } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import '../styles/2_User.css'
import brand_icon from '../assets/kokan_icon_w.png'

/* import components */
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

  return (
    <div id='user-info-container'>

      <div style={{ color: 'var(--main-color-yellow)' }}>
        {props.otherUser?.username || user?.username}
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
          Total assets: {props.otherUser?.asset_count || user?.asset_count}
        </div>
        <div>
          Assets on offer:{' '}
          {props.otherUser?.asset_count_pending || user?.asset_count_pending}
        </div>
        <div>
          Pending incoming requests:{' '}
          {props.otherUser?.requests_incoming_count_pending ||
            user?.requests_incoming_count_pending}
        </div>
        <div>
          Pending Outgoing requests:{' '}
          {props.otherUser?.requests_outgoing_count_pending ||
            user?.requests_outgoing_count_pending}
        </div>
        <div>Memmber since: {user?.created || user?.created}</div>
      </div>
    </div>
  )
}

export default UserInfo

/*
      <ProfileAvatar user={props.otherUser || user}></ProfileAvatar>
*/
