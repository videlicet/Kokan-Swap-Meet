import React, { useState, useEffect, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

/* import components */

import AlertDialogRequest, {
  AlertDialogRequestContent,
} from './AlertDialogRequest'

/* context */
import { UserContext } from '../routes/1_App'

import serverURL from '../../server_URL'

/* import types */

import { RequestInterface } from '../assets/mockRequests'

interface Request {
  requestProps: RequestInterface
  alertDialogRequestContentAccept: AlertDialogRequestContent
  alertDialogRequestContentDecline: AlertDialogRequestContent
  index: number
}

const RequestIncoming: React.FC<Request> = (props: Request) => {
  const navigate = useNavigate()
  const { user, setUser } = useContext<any>(UserContext)
  const [portalContainer, setPortalContainer] = useState(
    document.getElementById('requests'),
  )

  useEffect(() => {
    setPortalContainer(document.getElementById('requests'))
  }, [])

  async function onConfirm(reaction: string) {
    try {
      const res = await fetch(
        `${serverURL}transactions/${props.requestProps._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transaction: { status: reaction } }),
        },
      )
      if (res.status === 200) {
        /* update ownership of asset */
        await fetch(`${serverURL}assets/${props.requestProps.asset_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            asset: { asset_id: props.requestProps.asset_id },
            update: { $push: { owners: props.requestProps.requester._id, brokers: props.requestProps.requester._id } },
          }),
        })

        /* update requestee kokans */
        await fetch(`${serverURL}users/${user._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: { _id: user._id },
            update: {
              kokans: user.kokans + props.requestProps.asset_id.kokans,
            },
          }),
        })

        /* update requester kokans  */
        await fetch(`${serverURL}users/${props.requestProps.requester._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: { _id: props.requestProps.requester._id },
            update: {
              kokans:
                props.requestProps.requester.kokans -
                props.requestProps.asset_id.kokans,
            },
          }),
        })

        /* update user (aka requestee) state */
        setUser({
          ...user,
          kokans: user.kokans + props.requestProps.asset_id.kokans,
        })

        // is this double???

        /* update requester kokans  */
        await fetch(`${serverURL}users/${props.requestProps.requester._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: { _id: props.requestProps.requester._id },
            update: {
              kokans:
                props.requestProps.requester.kokans -
                props.requestProps.asset_id.kokans,
            },
          }),
        })

        navigate(`/user/${user.username}/requests/incoming`)
      }
    } catch (err) {
      // TD errHandling
    }
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

  return (
    <div
      className={dynamicRequestStyle(props.requestProps.status)}
      key={props.index}
    >
      <div className='header'>
        <span className='title'>
          <NavLink to={`/assets/${props.requestProps.asset_id._id}`}>
            {props.requestProps.asset_id.title}
          </NavLink>{' '}
          requested by{' '}
          <NavLink to={`/user/${props.requestProps.requester.username}/assets`}>
            {props.requestProps.requester.username}
          </NavLink>
        </span>
      </div>
      <div className='description'>
        <span>
          User {props.requestProps.requester.username} requests a swap for your
          asset {props.requestProps.asset_id.title}.
        </span>
      </div>
      {props.requestProps.status === 'pending' && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <AlertDialogRequest
            portalContainer={portalContainer}
            content={props.alertDialogRequestContentAccept}
            onConfirm={() => onConfirm('accepted')}
          />
          <AlertDialogRequest
            portalContainer={portalContainer}
            content={props.alertDialogRequestContentDecline}
            onConfirm={() => onConfirm('declined')}
          />
        </div>
      )}
    </div>
  )
}

export default RequestIncoming
