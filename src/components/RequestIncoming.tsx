import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

/* import components */

import AlertDialogRequest, { AlertDialogRequestContent } from './AlertDialogRequest'

interface Request {
  requestProps: {
    request_id: number,
    asset_id : string,
    requester: string,
    requestee: string,
    request_created: string,
    owners: string[],
    status: string
  }
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
