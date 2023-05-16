import React, { useEffect, useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

/* import components */
import AlertDialogRequest, {
  AlertDialogRequestContent,
} from './AlertDialogRequest'

import serverURL from '../../server_URL'

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
        `${serverURL}transactions/${props.requestProps?._id}`,
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
      className={dynamicRequestStyle(props.requestProps?.status)}
      key={props.index}
    >
      <div className='header'>
        <span className='title'>
          Request for{' '}
          <NavLink to={`assets/${props.requestProps?.asset_id}`}>
            {props.requestProps?.asset_id.title}
          </NavLink>
        </span>
      </div>
      <div className='description'>
        <span>
          You requested{' '}
          <NavLink to={`assets/${props.requestProps?.asset_id}`}>
            {props.requestProps?.asset_id.title}
          </NavLink>{' '}
          from user{' '}
          <NavLink to={`/user/${props.requestProps?.requestee.username}`}>
            {props.requestProps?.requestee.username}
          </NavLink>
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
