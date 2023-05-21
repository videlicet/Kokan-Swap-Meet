import { useState, useEffect, useContext } from 'react'
import '../styles/2.3.1–2_User_Requests.css'

/* import components */
import RequestIncoming from '../components/RequestIncoming.tsx'

/* import types */
import { RequestInterface } from '../assets/mockRequests.tsx'

/* import context */
import { UserContext } from './1_App'

/* request dialog content */
import { getRequestsIncoming } from '../modules/Requestor.tsx'

/* request dialog content */
const alertDialogRequestContentAccept = {
  title: 'Please confirm the swap request of your asset',
  description: 'Your asset will be co-owned by you and the requester.',
  button: {
    button: 'accept',
    confirm: 'accept',
    cancel: 'cancel',
  },
}

const alertDialogRequestContentDecline = {
  title: 'Please confirm you want to declien this swap request',
  description: 'The requester may request the asset again.',
  button: {
    button: 'decline',
    confirm: 'decline',
    cancel: 'cancel',
  },
}

/* function component */
function UserRequestsIncoming(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user, setUser } = useContext<any>(UserContext)
  const [requests, setRequests] = useState<any>()

  if (!requests) getRequestsIncoming(user, setRequests) // assures fetch on page refresh

  useEffect(() => {
    getRequestsIncoming(user, setRequests)
  }, [])

  return (
    <div id='requests'>
      {requests?.length !== 0 ? (
        requests?.map((item: any, index: number) => (
          <RequestIncoming
            requestProps={item}
            index={index}
            alertDialogRequestContentAccept={alertDialogRequestContentAccept}
            alertDialogRequestContentDecline={alertDialogRequestContentDecline}
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
