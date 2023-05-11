import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

/* import components */

import AlertDialogRequest, {
  AlertDialogRequestContent,
} from './AlertDialogRequest'

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
        await fetch(`${serverURL}assets/${props.requestProps.asset_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            asset: { asset_id: props.requestProps.asset_id },
            update: { $push: {owners: props.requestProps.requester._id}}
          }),
        })
      }
    } catch (err) {
      // TD errHandling
    }
  }

  return (
    <div className='request' key={props.index}>
      <div className='header'>
        <span className='title'>
          {props.requestProps.title} requested from{' '}
          <NavLink to={`/user/${props.requestProps.requester.username}/assets`}>
            {props.requestProps.requester.username}
          </NavLink>
        </span>
      </div>
      <div className='description'>
        <span>
          User {props.requestProps.requester.username} requests a swap for your
          asset {props.requestProps.title}.
        </span>
      </div>
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
    </div>
  )
}

export default RequestIncoming
