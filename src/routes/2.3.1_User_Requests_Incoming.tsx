import { useState, useEffect, useContext, useRef } from 'react'
import '../styles/2.3.1–2_User_Requests.css'

/* import components */
import RequestIncoming from '../components/RequestIncoming.tsx'

/* import types */
import { RequestInterface } from '../assets/mockRequests.tsx'

/* import context */
import { UserContext } from './1_App'

/* request dialog content */
import { getUserRequests } from '../modules/Requestor.tsx'

/* function component */
function UserRequestsIncoming(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user, setUser } = useContext<any>(UserContext)
  const requests = useRef<any>([]) // type

  if (!requests) getUserRequests(user, requests, 'requestee', setLoading) // assures fetch on page refresh

  useEffect(() => {
    getUserRequests(user, requests, 'requestee', setLoading)
  }, [])

  return (
    <div id='requests'>
      {loading ? (
        <span>Loading</span>
      ) : requests?.current.length !== 0 ? (
        requests?.current.map((item: any, index: number) => (
          <RequestIncoming
            requestProps={item}
            index={index}
          ></RequestIncoming>
        ))
      ) : (
        <div className='request'>
          <div style={{ marginLeft: '1rem' }}>
            <p>No incoming swap requests yet.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserRequestsIncoming
