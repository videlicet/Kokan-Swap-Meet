import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

/* import components */

import AlertDialogRequest, { AlertDialogRequestContent } from './AlertDialogRequest'

/* type */

interface Request {
  requestProps: {
    request_id: number,
    asset_id : string,
    requester: string,
    requestee: string,
    request_created: string,
    owners: string[],
    status: string
  },
  alertDialogRequestContent: AlertDialogRequestContent,
  index: number
}

/* component */

const RequestOutgoing: React.FC<Request> = (props: Request) => {
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
        <span className='title'>Request for {props.requestProps.asset_id}</span>
    </div>
    <div className='description'>
      <span>You requested <NavLink to={`assets/${props.requestProps.asset_id}`}>{props.requestProps.asset_id}</NavLink> from User <NavLink to={`users/${props.requestProps.requester}`}>{props.requestProps.requester}</NavLink>.</span>
    </div>
    <AlertDialogRequest portalContainer={portalContainer} content={props.alertDialogRequestContent} onConfirm={onConfirm}/>
  </div>)
}

export default RequestOutgoing
