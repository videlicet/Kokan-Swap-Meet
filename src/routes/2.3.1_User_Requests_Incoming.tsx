import { useState, useEffect, useContext } from 'react'
import { useOutletContext } from 'react-router-dom'
import '../styles/2.3.1–2_User_Requests.css'

/* import components */
import RequestIncoming from '../components/RequestIncoming.tsx'

import { RequestInterface } from '../assets/mockRequests.tsx'

/* context */
import { UserContext } from './1_App'

import serverURL from '../../server_URL'

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
function UserRequestsIncoming(): JSX.Element | undefined {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const {user, setUser} = useContext<any>(UserContext)
  const [requests, setRequests] = useState<any>()

  async function getData() {
    try {
      const res = await fetch(`${serverURL}users/${user.username}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: 'requestee', user: { _id: user._id } }),
      })
      if (res.status == 200) {
        const userRequest = await res.json()
        console.log(userRequest)

        /* get requesters from requester ids */
        const requesters = await Promise.all(
          userRequest.map(async (request: any) => {
            const user = await fetch(`${serverURL}users/${request.requester}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user: { _id: request.requester } }),
            })
            return await user.json()
          }),
        )

        /* get assets from asset ids*/
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
          userRequest[index].requester = requesters[index] // QQ is there a way to aggregate the results or should i store the entire info on the value
          userRequest[index].requestee = user
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

  if (requests)
    return (
      <div id='requests'>
        {requests.map((item: any, index: number) => (
          <RequestIncoming
            requestProps={item}
            index={index}
            alertDialogRequestContentAccept={alertDialogRequestContentAccept}
            alertDialogRequestContentDecline={alertDialogRequestContentDecline}
          ></RequestIncoming>
        ))}
      </div>
    )
}

export default UserRequestsIncoming
