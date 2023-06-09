import { useState, useEffect, useContext, useRef } from 'react'
import { NavLink } from 'react-router-dom'

/* import styles */
import '../styles/2.3.1–2_User_Requests.css'

/* import components */
import RequestOutgoing from '../components/RequestOutgoing'
import Loading from '../components/Loading'

/* import context */
import { UserContext } from './1_App'

/* import modules */
import { getUserRequests } from '../modules/Requestor'

function UserRequestsOutgoing(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user, setUser } = useContext<any>(UserContext)  // TODO typing
  const requests = useRef<any>([]) // TODO typing

  if (!requests) getUserRequests(user, requests, 'requester', setLoading) // assures fetch on page refresh

  useEffect(() => {
    getUserRequests(user, requests, 'requester', setLoading)
  }, [])

  return (
    <div id='requests'>
      {loading ? (
        <Loading />
      ) : requests?.current.length !== 0 ? (
        requests?.current.map((item: any, index: number) => (
          <RequestOutgoing
            key={index}
            requestProps={item}
            index={index}
            username={user.username}
            requests={requests}
            setLoading={setLoading}
          ></RequestOutgoing>
        ))
      ) : (
        <div className='request'>
          <div style={{ marginLeft: '1rem' }}>
            <p>No outgoing swap requests yet.</p>
            <p>
              Browse the{' '}
              <NavLink className='link' to={`/assets`} >
                <span>swap-meet</span>
              </NavLink>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserRequestsOutgoing
