import React from 'react'
import { NavLink } from 'react-router-dom'

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
  index: number
}

const RequestOutgoing: React.FC<Request> = (props: Request) => (
  <div className='request' key={props.index}>
    <div className='header'>
        <span className='title'>Request for {props.requestProps.asset_id}</span>
    </div>
    <div className='description'>
      <span>You requested <NavLink to={`assets/${props.requestProps.asset_id}`}>{props.requestProps.asset_id}</NavLink> from User <NavLink to={`users/${props.requestProps.requester}`}>{props.requestProps.requester}</NavLink>.</span>
    </div>
    <button>Withdraw</button>
  </div>
)

export default RequestOutgoing
