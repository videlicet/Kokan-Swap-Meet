import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

/* import components */

import AlertDialogRequest, { AlertDialogRequestContent } from './AlertDialogRequest'

/* type */

import { RequestInterface } from '../assets/mockRequests'

interface Request {
  requestProps: RequestInterface,
  alertDialogRequestContentAccept: AlertDialogRequestContent,
  alertDialogRequestContentDecline: AlertDialogRequestContent,
  index: number
}

const RequestIncoming: React.FC<Request> = (props: Request) => {
  const [portalContainer, setPortalContainer] = useState(
    document.getElementById('requests'),
  )

  useEffect(() => {
    setPortalContainer(document.getElementById('requests'))
  }, [])

  function onConfirm() {
    console.log('confirm clicked')
  }

  return (
  <div className='request' key={props.index}>
    <div className='header'>
        <span className='title'>{props.requestProps.asset_id} requested from {props.requestProps.requester}</span>
    </div>
    <div className='description'>
      <span>User <NavLink to={`user${props.requestProps.requester}`}>{props.requestProps.requester}</NavLink> requests a swap for your asset {props.requestProps.asset_id}.</span>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <AlertDialogRequest portalContainer={portalContainer} content={props.alertDialogRequestContentAccept} onConfirm={onConfirm}/>
      <AlertDialogRequest portalContainer={portalContainer} content={props.alertDialogRequestContentDecline} onConfirm={onConfirm}/>
    </div>
  </div>
  )
}

export default RequestIncoming
