import { useState, useEffect, useContext, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/2.3.1–2_User_Requests.css'

/* import components */
import RequestOutgoing from '../components/RequestOutgoing.tsx'

/* context */
import { UserContext } from './1_App'
import { getRequestsOutgoing } from '../modules/Requestor.tsx'

const alertDialogRequestContent = {
  title: 'Please confirm your withdrawel',
  description:
    'Your swap request will be deleted. You can request the asset again after withdrawel.',
  button: {
    button: 'withdraw',
    confirm: 'withdraw',
    cancel: 'cancel',
  },
}

/* function component */
function UserRequestsOutgoing(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user, setUser } = useContext<any>(UserContext)
  const [requests, setRequests] = useState<any>()
  const portalContainer = useRef(document.getElementById('requests'))

  if (!requests) getRequestsOutgoing(user, setRequests) // assures fetch on page refresh

  useEffect(() => {
    getRequestsOutgoing(user, setRequests, setLoading)
  }, [])

  return (
    <div id='requests'>
      {loading ? (
        <span>Loading</span>
      ) : requests?.length !== 0 ? (
        requests?.map((item: any, index: number) => (
          <RequestOutgoing
            portalContainer={portalContainer}
            requestProps={item}
            index={index}
            alertDialogRequestContent={alertDialogRequestContent}
            username={user.username}
          ></RequestOutgoing>
        ))
      ) : (
        <div className='request'>
          <div style={{ marginLeft: '1rem' }}>
            <p>No outgoing swap requests yet.</p>
            <NavLink to={`/assets`} className='unstyledLink'>
              <p>Browse kokan assets.</p>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserRequestsOutgoing
