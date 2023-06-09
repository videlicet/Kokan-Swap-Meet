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

/* types */
interface Props {
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

/* import request dialog content */
import { alertDialogRequestContentDelete } from '../components/RequestDialogs.tsx'

const RequestOutgoing: React.FC<Props> = (props: Props) => {
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
    props.setLoading(true)
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
      // TODO ERROR HANDLING
    }

    /* delete transaction */
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}transactions/${
          props.requestProps?._id
        }`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
        },
      )
      if (res.status === 200) {
        navigate(`/me/requests/outgoing`)
      }
    } catch (err) {
      // TODO ERROR HANDLING
    }

    /* rebate pending kokans to requester */
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
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify(reqBody),
        },
      )
      props.setLoading(false)
    } catch (err) {
      // TODO ERROR HANDLING
      props.setLoading(false)
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
          Request for {props.requestProps?.asset_data.title}
        </span>
        <span className='expiration'>EXPIRATION {expirationDateFormatted}</span>
      </div>

      <div
        className='description'
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <span>
          You requested{' '}
          <NavLink
            className='link'
            to={`/assets/${props.requestProps?.asset_data._id}`}
          >
            {props.requestProps?.asset_data.title}
          </NavLink>{' '}
          from{' '}
          {props.requestProps?.requestees_username.length > 1
            ? 'users:'
            : 'user'}{' '}
          {props.requestProps?.requestees_username.map(
            (username: string, index: number) => (
              <NavLink key={index} to={`/user/${username}`}>
                <span className='link'>{username}</span>
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
