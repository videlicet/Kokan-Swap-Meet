import React, { useEffect, useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

/* import components */
import AlertDialogRequest, {
  AlertDialogRequestContent,
} from './AlertDialogRequest'

/* import types */
import { RequestInterface } from '../assets/mockRequests'

/* import context */
import { PortalContext, UserContext } from '../routes/1_App'

/* import request dialog content */
import { alertDialogRequestContentDelete } from '../components/RequestDialogs.tsx'

interface Request {
  requestProps: RequestInterface
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
    case 'expired':
      return 'request expired'
  }
}

/* component */
const RequestOutgoing: React.FC<Request> = (props: Request) => {
  const navigate = useNavigate()
  const { portalContainer } = useContext<any>(PortalContext)
  const { user } = useContext<any>(UserContext)

  async function onConfirm() {
    /* delete transaction */
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
    } catch (err) {
      // TD errorHandling
      console.log(err)
    }
    /* change total kokans and pending kokans */
    const changes = {
      $inc: {
        kokans: +props.requestProps?.asset_data.kokans,
        kokans_pending: -props.requestProps?.asset_data.kokans,
      },
    }
    const reqBody = {
      user: { _id: user?._id },
      update: { changes: changes },
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}users/${user?._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(reqBody),
        },
      )
    } catch (err) {
      // TD errorHandling
      console.log(err)
    }
  }

  return (
    <div
      className={dynamicRequestStyle(props.requestProps?.status)}
      key={props.index}
    >
      <div className='header'>
        <span className='title'>
          Request for{' '}
          <NavLink to={`/assets/${props.requestProps?.asset_data._id}`}>
            {props.requestProps?.asset_data.title}
          </NavLink>
        </span>
      </div>
      <div className='description'>
        <span>
          You requested{' '}
          <NavLink to={`/assets/${props.requestProps?.asset_data._id}`}>
            {props.requestProps?.asset_data.title}
          </NavLink>{' '}
          from users:{' '}
          {props.requestProps?.requestees_username.map(
            (username: string, index: number) => (
              <NavLink to={`/user/${username}`}>
                {username}
                {index + 1 !== props.requestProps?.requestees_username.length
                  ? ', '
                  : '.'}
              </NavLink>
            ),
          )}
        </span>
      </div>
      {props.requestProps?.status === 'pending' && (
        <AlertDialogRequest
          portalContainer={portalContainer}
          content={alertDialogRequestContentDelete}
          onConfirm={onConfirm}
        />
      )}
    </div>
  )
}

export default RequestOutgoing
