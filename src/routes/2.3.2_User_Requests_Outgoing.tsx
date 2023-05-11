import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import '../styles/2.3.1–2_User_Requests.css'

/* import components */
import RequestOutgoing from '../components/RequestOutgoing.tsx'

import serverURL from '../../server_URL'

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
function UserRequestsIncoming(): JSX.Element | undefined {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [user, setUser] = useOutletContext() as any[]
  const [requests, setRequests] = useState<any>()

  async function getData() {
    try {
      const res = await fetch(`${serverURL}users/${user.username}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: 'requester', user: { _id: user._id } }),
      })
      if (res.status == 200) {
        const userRequest = await res.json()

        /* get usernames from requestee id */
        const requestees = await Promise.all(
          userRequest.map(async (request: any) => {
            const user = await fetch(`${serverURL}users/${request.requestee}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user: { _id: request.requestee } }),
            })
            return await user.json()
          }),
        )

        console.log(requestees)

        const assets = await Promise.all(
          userRequest.map(async (request: any) => {
            const res = await fetch(`${serverURL}assets/${request.asset_id}`, {
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
          userRequest[index].requestee = requestees[index] //is there a way to aggregate the results or should i store the entire info on the value
          userRequest[index].title = assets[index].title
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
        <RequestOutgoing requestProps={item} index={index} alertDialogRequestContent={alertDialogRequestContent}></RequestOutgoing>
      ))}
    </div>
  )
}

export default UserRequestsIncoming
