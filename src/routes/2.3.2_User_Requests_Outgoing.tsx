import { useState, useEffect, useContext, useRef } from 'react'
import '../styles/2.3.1–2_User_Requests.css'

/* import components */
import RequestOutgoing from '../components/RequestOutgoing.tsx'

/* context */
import { UserContext } from './1_App'

const alertDialogRequestContent = {
  title: 'Please confirm your withdrawel',
  description: 'Your swap request will be deleted. You can request the asset again after withdrawel.',
  button: {
    button: 'withdraw',
    confirm: 'withdraw',
    cancel: 'cancel'
  }
}

/* function component */
function UserRequestsOutgoing(): JSX.Element | undefined {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const {user, setUser} = useContext<any>(UserContext)
  const [requests, setRequests] = useState<any>()
  const portalContainer = useRef(document.getElementById('requests'))

  if (!requests) getData() // assures fetch on page refresh

  async function getData() {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}users/${user.username}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: 'requester', user: { _id: user._id } }),
      })
      if (res.status == 200) {
        const userRequest = await res.json()

        /* get username from requestee id */
        const requestees = await Promise.all(
          userRequest.map(async (request: any) => {
            const user = await fetch(`${import.meta.env.VITE_SERVER_URL}users/${request.requestee}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user: { _id: request.requestee } }),
            })
            return await user.json()
          }),
        )

        /* get assets from asset ids*/
        const assets = await Promise.all(
          userRequest.map(async (request: any) => {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}assets/${request.asset_id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ asset: { _id: request.asset_id } }),
            })
            const asset = await res.json()
            return asset
          }),
        )
        
        userRequest.forEach((request: any, index: number) => {
          userRequest[index].requestee = requestees[0] // QQ is there a way to aggregate the results or should i store the entire info on the value
          userRequest[index].asset_id = assets[index]
        })
        setRequests(userRequest)
      }
    } catch (error) {
      //errorHandling
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (requests) return (
    <div id='requests'>
      {requests.map((item: any, index: number) => (
        <RequestOutgoing portalContainer={portalContainer} requestProps={item} index={index} alertDialogRequestContent={alertDialogRequestContent} username={user.username}></RequestOutgoing>
      ))}
    </div>
  )
}

export default UserRequestsOutgoing
