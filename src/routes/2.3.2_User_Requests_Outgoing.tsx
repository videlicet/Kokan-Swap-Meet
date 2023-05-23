import { useState, useEffect, useContext, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/2.3.1–2_User_Requests.css'

/* import components */
import RequestOutgoing from '../components/RequestOutgoing.tsx'

/* import context */
import { UserContext } from './1_App'
import { getUserRequests } from '../modules/Requestor.tsx'

/* function component */
function UserRequestsOutgoing(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user, setUser } = useContext<any>(UserContext)
  const requests = useRef<any>([]) // type

  if (!requests) getUserRequests(user, requests, 'requester', setLoading) // assures fetch on page refresh

  useEffect(() => {
    getUserRequests(user, requests, 'requester', setLoading)
  }, [])

  return (
    <div id='requests'>
      {loading ? (
        <span>Loading</span>
      ) : requests?.current.length !== 0 ? (
        requests?.current.map((item: any, index: number) => (
          <RequestOutgoing
            requestProps={item}
            index={index}
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
