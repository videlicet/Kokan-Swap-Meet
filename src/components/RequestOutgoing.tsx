import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

/* import components */

import AlertDialogRequest, { AlertDialogRequestContent } from './AlertDialogRequest'

/* type */

import { RequestInterface } from '../assets/mockRequests'

interface Request {
  requestProps: RequestInterface,
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
        <span className='title'>Request for {props.requestProps.title}</span>
    </div>
    <div className='description'>
      <span>You requested <NavLink to={`assets/${props.requestProps.asset_id}`}>{props.requestProps.title}</NavLink> from user <NavLink to={`users/${props.requestProps.requestee.username}`}>{props.requestProps.requestee.username}</NavLink>.</span>
    </div>
    <AlertDialogRequest portalContainer={portalContainer} content={props.alertDialogRequestContent} onConfirm={onConfirm}/>
  </div>)
}

export default RequestOutgoing
