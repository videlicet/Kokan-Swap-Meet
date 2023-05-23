import React, { useEffect, useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

/* import components */
import AlertDialogRequest, {
  AlertDialogRequestContent,
} from './AlertDialogRequest'

/* import types */
import { RequestInterface } from '../assets/mockRequests'

/* import context */
import { PortalContext } from '../routes/1_App'

interface Request {
  requestProps: RequestInterface
  alertDialogRequestContent: AlertDialogRequestContent
  index: number
  username: string
  portalContainer: any // TD type
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
  const { portalContainer } = useContext<any>(PortalContext)

  async function onConfirm() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}transactions/${
          props.requestProps?._id
        }`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      )
      if (res.status === 200) {
        navigate(`/user/${props.username}/requests/outgoing`)
      }
    } catch (err) {}
  }

  return (
    <div
      className={dynamicRequestStyle(props.requestProps?.status)}
      key={props.index}
    >
      <div className='header'>
        <span className='title'>
          Request for{' '}
          <NavLink to={`/assets/${props.requestProps?.asset_id._id}`}>
            {props.requestProps?.asset_id.title}
          </NavLink>
        </span>
      </div>
      <div className='description'>
        <span>
          You requested{' '}
          <NavLink to={`/assets/${props.requestProps?.asset_id._id}`}>
            {props.requestProps?.asset_id.title}
          </NavLink>{' '}
          from users:{' '}
          {props.requestProps?.requestees_username.map((username: string, index: number) => (
            <NavLink to={`/user/${username}`}>{username}{index+1 !== props.requestProps?.requestees_username.length ? ", " : "."}</NavLink>
          ))}
        </span>
      </div>
      {props.requestProps?.status === 'pending' && (
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
