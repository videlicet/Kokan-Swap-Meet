import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import date from 'date-and-time'

/* import components */
import AlertDialogRequest from './AlertDialogRequest'

/* import types */
import { RequestInterface } from '../types/types'

/* import context */
import { PortalContext, UserContext } from '../routes/1_App'

/* import modules */
import { getUser } from '../modules/Authenticator'
import { getUserRequests } from '../modules/Requestor'

/* import request dialog content */
import { alertDialogRequestContentDelete } from '../components/RequestDialogs.tsx'

interface Request {
  requestProps: RequestInterface
  index: number
  username: string
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  requests: any // TODO typing
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

const RequestOutgoing: React.FC<Request> = (props: Request) => {
  const navigate = useNavigate()
  const { portalContainer } = useContext<any>(PortalContext)
  const { user, setUser } = useContext<any>(UserContext)

  /* prepare expiration date */
  const creationDate = new Date(props.requestProps?.created)
  const expirationDate = creationDate.setUTCDate(creationDate.getUTCDate() + 5)
  const expirationDateFormatted = date.format(
    new Date(expirationDate),
    'YYYY/MM/DD, HH:mm',
  )

  async function onConfirm() {
    /* confirm the request is still pending by trying to find it as pending */
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}transactions/${
          props.requestProps?._id
        }`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
        },
      )
      if (res.status === 404) {
        getUser(setUser, navigate)
        getUserRequests(user, props.requests, 'requestee', props.setLoading)
        return
      }
    } catch (err) {
      console.log(err)
    }

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
            'Access-Control-Allow-Credentials': 'true',
          },
          credentials: 'include',
        },
      )
      if (res.status === 200) {
        navigate(`/user/${props.username}/requests/outgoing`)
      }
    } catch (err) {
      // TODO errorHandling
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
            'Access-Control-Allow-Credentials': 'true',
          },
          credentials: 'include',
          body: JSON.stringify(reqBody),
        },
      )
    } catch (err) {
      // TODO errorHandling
      console.log(err)
    }
    getUser(setUser, navigate)
    getUserRequests(user, props.requests, 'requester', props.setLoading)
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
        <span className='expiration'>EXPIRATION {expirationDateFormatted}</span>
      </div>

      <div
        className='description'
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <span>
          You requested{' '}
          <NavLink to={`/assets/${props.requestProps?.asset_data._id}`}>
            {props.requestProps?.asset_data.title}
          </NavLink>{' '}
          from users:{' '}
          {props.requestProps?.requestees_username.map(
            (username: string, index: number) => (
              <NavLink key={index} to={`/user/${username}`}>
                {username}
                {index + 1 !== props.requestProps?.requestees_username.length
                  ? ', '
                  : '.'}
              </NavLink>
            ),
          )}
        </span>
        {props.requestProps?.status !== 'pending' && (
          <span
            className='reaction'
            style={
              (props.requestProps?.status === 'declined' && {
                backgroundColor: 'rgb(190, 53, 11)',
              }) ||
              (props.requestProps?.status === 'accepted' && {
                backgroundColor: 'rgb(91, 128, 73, 1)',
              }) ||
              (props.requestProps?.status === 'expired' && {
                backgroundColor: 'grey',
              })
            }
          >
            {(props.requestProps?.status === 'declined' && 'declined') ||
              (props.requestProps?.status === 'accepted' && 'accepted') ||
              (props.requestProps?.status === 'expired' && 'expired')}
          </span>
        )}
        {props.requestProps?.status === 'pending' && (
          <AlertDialogRequest
            portalContainer={portalContainer}
            content={alertDialogRequestContentDelete}
            onConfirm={onConfirm}
          />
        )}
      </div>
    </div>
  )
}

export default RequestOutgoing
