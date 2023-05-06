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

const RequestIncoming: React.FC<Request> = (props: Request) => (
  <div className='request' key={props.index}>
    <div className='header'>
        <span className='title'>{props.requestProps.asset_id} requested from {props.requestProps.requester}</span>
    </div>
    <div className='description'>
      <span>User <NavLink to={`user${props.requestProps.requester}`}>{props.requestProps.requester}</NavLink> requests a swap for your asset {props.requestProps.asset_id}.</span>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <button>Accept</button>
      <button>Decline</button>
    </div>
  </div>
)

export default RequestIncoming
