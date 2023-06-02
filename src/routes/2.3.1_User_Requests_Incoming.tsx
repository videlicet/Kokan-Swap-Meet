import { useState, useEffect, useContext, useRef } from 'react'
import '../styles/2.3.1–2_User_Requests.css'

/* import components */
import RequestIncoming from '../components/RequestIncoming'
import Loading from '../components/Loading'

/* import context */
import { UserContext } from './1_App'

/* request dialog content */
import { getUserRequests } from '../modules/Requestor'

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
        <Loading />
      ) : requests?.current.length !== 0 ? (
        requests?.current.map((item: any, index: number) => (
          <RequestIncoming
            key={index}
            requestProps={item}
            index={index}
            requests={requests}
            setLoading={setLoading}
          />
        ))
      ) : (
        <div className='request' >
          <p>No incoming swap requests yet.</p>
        </div>
      )}
    </div>
  )
}

export default UserRequestsIncoming
