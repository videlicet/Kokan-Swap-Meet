import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

/* import components */

import AlertDialogRequest, {
  AlertDialogRequestContent,
} from './AlertDialogRequest'

import serverURL from '../../server_URL'

/* import types */

import { RequestInterface } from '../assets/mockRequests'

interface Request {
  requestProps: RequestInterface
  alertDialogRequestContent: AlertDialogRequestContent
  index: number
  username: string
}

/* change style of request depending on status */
function dynamicRequestStyle(status: string) {
  switch (status) {
    case 'pending':
      return 'request'
    case 'accepted':
      return 'request accepted'
    case 'declined':
      return 'request declined'
  }
}

/* component */
const RequestOutgoing: React.FC<Request> = (props: Request) => {
  const navigate = useNavigate()
  const [portalContainer, setPortalContainer] = useState(
    document.getElementById('requests'),
  )

  useEffect(() => {
    setPortalContainer(document.getElementById('requests'))
    console.log(props)
  }, [])

  async function onConfirm() {
    try {
      const res = await fetch(
        `${serverURL}transactions/${props.requestProps._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      )
      if (res.status === 200) {
        navigate(`/user/${props.username}/assets`)
      }
    } catch (err) {}
  }

  return (
    <div
      className={dynamicRequestStyle(props.requestProps.status)}
      key={props.index}
    >
      <div className='header'>
        <span className='title'>
          Request for{' '}
          <NavLink to={`assets/${props.requestProps.asset_id}`}>
            {props.requestProps.asset_id.title}
          </NavLink>
        </span>
      </div>
      <div className='description'>
        <span>
          You requested{' '}
          <NavLink to={`assets/${props.requestProps.asset_id}`}>
            {props.requestProps.asset_id.title}
          </NavLink>{' '}
          from user{' '}
          <NavLink to={`/user/${props.requestProps.requestee.username}`}>
            {props.requestProps.requestee.username}
          </NavLink>
          .
        </span>
      </div>
      {props.requestProps.status === 'pending' && (
        <AlertDialogRequest
          portalContainer={portalContainer}
          content={props.alertDialogRequestContent}
          onConfirm={onConfirm}
        />
      )}
    </div>
  )
}

export default RequestOutgoing
