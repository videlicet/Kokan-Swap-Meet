import { useState, useContext, useEffect } from 'react'
import date from 'date-and-time'

/* import styles */
import '../styles/2_User.css'

/* import components */
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import ProfileAvatar from '../components/ProfileAvatar'
import TooltipInfo from '../components/Tooltip'
import brand_icon from '../assets/kokan_icon_w.png'

/* import context */
import { UserContext } from '../routes/1_App'
import Loading from './Loading'

/* types */
interface Props {
  otherUser?: any // TODO type
  loadingUserInfo: boolean
}

function UserInfo(props?: Props): JSX.Element {
  const { user, setUser } = useContext<any>(UserContext)
  const [renderTrigger, setRenderTrigger] = useState(false)
  const otherUser = props?.otherUser

  useEffect(() => {
    setRenderTrigger(!renderTrigger)
  }, [])

  /* tooltips */
  const tooltipKokans = <span>pending incoming / outgoing requests</span>
  const tooltipAssets = (
    <span>offered {!otherUser && <span> / total</span>}</span>
  )
  const tooltipRequests = (
    <span>{user?.kokans_pending > 0 && <span>current / pending</span>}</span>
  )

  return (
    <div id='user-info-container'>
      {!props.loadingUserInfo ? (
        <div>
          <div id='user-info-header'>
            <ProfileAvatar user={otherUser || user}></ProfileAvatar>
            <span>
              {otherUser?.username || user?.username}
              <a
                href={`https://github.com/${
                  otherUser?.username || user?.username
                }`}
                target='_blank'
              >
                &nbsp;
                <ExternalLinkIcon />
              </a>
            </span>
          </div>
          <div id='user-info'>
            {!otherUser && (
              <div>
                <span>Kokans: {user?.kokans}</span>
                {user?.kokans_pending > 0 && (
                  <span> / {user?.kokans_pending} </span>
                )}{' '}
                <img
                  src={brand_icon}
                  alt='kokans'
                  height='16px'
                  style={{ position: 'relative', top: '3px' }}
                />{' '}
                <TooltipInfo content={tooltipKokans} />
              </div>
            )}
            <div>
              <span>
                Assets:{' '}
                {otherUser?.assets_count_offered || user?.assets_count_offered}
                {!otherUser && <span> / {user?.assets_count}</span>}{' '}
                <TooltipInfo content={tooltipAssets} />
              </span>
            </div>
            {!otherUser && (
              <span>
                Pending requests: {user?.requests_incoming_count_pending} /{' '}
                {user?.requests_outgoing_count_pending}{' '}
                <TooltipInfo content={tooltipRequests} />
              </span>
            )}
            <div>
              <span>
                Member since:{' '}
                {otherUser
                  ? date.format(new Date(otherUser?.created), 'YYYY/MM/DD')
                  : date.format(new Date(user?.created), 'YYYY/MM/DD')}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default UserInfo
