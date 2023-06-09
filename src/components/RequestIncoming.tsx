import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import date from 'date-and-time'

/* import components */
import AlertDialogRequest from './AlertDialogRequest'

/* import context */
import { UserContext, PortalContext } from '../routes/1_App'

/* import modules */
import { getUser } from '../modules/Authenticator'
import { getUserRequests } from '../modules/Requestor'

/* import types */
import { RequestInterface } from '../types/types'

/* import request dialog content */
import {
  alertDialogRequestContentAccept,
  alertDialogRequestContentDecline,
} from '../components/RequestDialogs.tsx'

/* types */
interface Props {
  requestProps: RequestInterface
  index: number
  requests: any // TODO typing
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const RequestIncoming: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate()
  const { user, setUser } = useContext<any>(UserContext)
  const { portalContainer } = useContext<any>(PortalContext)

  const creationDate = new Date(props.requestProps?.created)
  const expirationOffset = 5
  const expirationDate = creationDate.setUTCDate(
    creationDate.getUTCDate() + expirationOffset,
  )
  const expirationDateFormatted = date.format(
    new Date(expirationDate),
    'YYYY/MM/DD, HH:mm',
  )

  async function onConfirm(reaction: string) {
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
        getUserRequests(user, props.requests, 'requester', props.setLoading)
        return
      }
    } catch (err) {
      // TODO ERROR HANDLING
    }

    /* update transaction status */
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}transactions/${
          props.requestProps._id
        }`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({ transaction: { status: reaction } }),
        },
      )
      if (res.status === 200 && reaction === 'accepted') {
        /* update ownership of asset */
        await fetch(
          `${import.meta.env.VITE_SERVER_URL}assets/${
            props.requestProps.asset_id
          }`,
          {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify({
              asset: { asset_id: props.requestProps.asset_data._id },
              update: {
                $push: {
                  owners: props.requestProps.requester,
                },
              },
            }),
          },
        )

        /* new kokan balance */
        const newRequesteeKokans =
          user.kokans + props.requestProps.asset_data.kokans

        /* update requestee kokans */
        await fetch(`${import.meta.env.VITE_SERVER_URL}users/${user._id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({
            user: { _id: user._id },
            update: {
              changes: {
                kokans: newRequesteeKokans,
              },
            },
          }),
        })

        /* update requester kokans  */
        await fetch(
          `${import.meta.env.VITE_SERVER_URL}users/${
            props.requestProps.requester
          }`,
          {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify({
              user: { _id: props.requestProps.requester },
              update: {
                changes: {
                  $inc: {
                    kokans_pending: -props.requestProps.asset_data.kokans,
                  },
                },
              },
            }),
          },
        )

        /* add requester as GitHub collaborator on repo */
        addCollaborator(
          user?.username,
          props.requestProps.requester_username,
          props.requestProps.asset_data.gitHub_repo,
        )

        navigate(`/me/requests/incoming`)
      }
      if (res.status === 200 && reaction === 'declined') {
        /* update requester kokans  */
        await fetch(
          `${import.meta.env.VITE_SERVER_URL}users/${
            props.requestProps.requester
          }`,
          {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify({
              user: { _id: props.requestProps.requester },
              update: {
                changes: {
                  $inc: {
                    kokans: props.requestProps.asset_data.kokans,
                    kokans_pending: -props.requestProps.asset_data.kokans,
                  },
                },
              },
            }),
          },
        )
      }
      props.setLoading(false)
    } catch (err) {
      // TODO errHandling
      props.setLoading(false)
    }
    getUser(setUser, navigate)
    getUserRequests(user, props.requests, 'requestee', props.setLoading)
  }

  /* add requester as GitHub collaborator on repo */
  async function addCollaborator(
    requesteeGitHub: string,
    requesterGitHub: string,
    gitHubRepo: string,
  ) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}auth/gitHub/addCollaborator`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({
            requesteeGitHub: requesteeGitHub,
            requesterGitHub: requesterGitHub,
            gitHubRepo: gitHubRepo,
          }),
        },
      )
    } catch (err) {
      // TODO ERROR HANDLING
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
      case 'expired':
        return 'request expired'
    }
  }
  return (
    <div
      className={dynamicRequestStyle(props.requestProps?.status)}
      key={props.index}
    >
      <div className='header'>
        <span className='title'>
          Incoming request for {props.requestProps?.asset_data.title}
        </span>
        <span className='expiration'>EXPIRATION {expirationDateFormatted}</span>
      </div>
      <div
        className='description'
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <span>
          User{' '}
          <NavLink
            className='link'
            to={`/user/${props.requestProps?.requester_username}/assets`}
          >
            {props.requestProps?.requester_username}
          </NavLink>{' '}
          requests a swap for your asset{' '}
          <NavLink
            className='link'
            to={`/assets/${props.requestProps?.asset_data._id}`}
          >
            {props.requestProps?.asset_data.title}
          </NavLink>
          .
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
      </div>
      {props.requestProps?.status === 'pending' && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <AlertDialogRequest
            portalContainer={portalContainer}
            content={alertDialogRequestContentAccept}
            onConfirm={() => onConfirm('accepted')}
          />
          <AlertDialogRequest
            portalContainer={portalContainer}
            content={alertDialogRequestContentDecline}
            onConfirm={() => onConfirm('declined')}
          />
        </div>
      )}
    </div>
  )
}

export default RequestIncoming
