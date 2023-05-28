import React, { useState, useEffect, useContext, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

/* import components */
import AlertDialogRequest from './AlertDialogRequest'

/* import context */
import { UserContext, PortalContext } from '../routes/1_App'

/* import types */
import { RequestInterface } from '../assets/mockRequests'

/* import utils */
import { aggregateTransactions } from '../modules/Requestor.tsx'

/* import request dialog content */
import {
  alertDialogRequestContentAccept,
  alertDialogRequestContentDecline,
} from '../components/RequestDialogs.tsx'

interface Request {
  requestProps: RequestInterface
  index: number
}

const RequestIncoming: React.FC<Request> = (props: Request) => {
  const navigate = useNavigate()
  const { user, setUser } = useContext<any>(UserContext)
  const { portalContainer } = useContext<any>(PortalContext)

  async function onConfirm(reaction: string) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}transactions/${
          props.requestProps._id
        }`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transaction: { status: reaction } }),
        },
      )
      if (res.status === 200 && reaction === 'accepted') {
        /* update ownership of asset */
        await fetch(
          `${import.meta.env.VITE_SERVER_URL}assets/${
            props.requestProps.asset_data
          }`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              asset: { asset_id: props.requestProps.asset_id },
              update: {
                $push: {
                  owners: props.requestProps.requester._id,
                  brokers: props.requestProps.requester._id, //necessary?
                },
              },
            }),
          },
        )
        /* new kokan balances */
        const newRequesteeKokans =
          user.kokans + props.requestProps.asset_data.kokans

        /* update requestee kokans */
        await fetch(`${import.meta.env.VITE_SERVER_URL}users/${user._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
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
            headers: { 'Content-Type': 'application/json' },
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

        /* update user (aka requestee) state */
        setUser({
          ...user,
          kokans: newRequesteeKokans,
        })

        /* add requester as GitHub collaborator on repo */
        addCollaborator(
          user.username,
          props.requestProps.requester_username,
          props.requestProps.asset_data.gitHub_repo,
        )

        navigate(`/user/${user.username}/requests/incoming`)
      }
      if (res.status === 200 && reaction === 'declined') {
        /* update requester kokans  */
        await fetch(
          `${import.meta.env.VITE_SERVER_URL}users/${
            props.requestProps.requester
          }`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
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
    } catch (err) {
      // TD errHandling
    }
  }

  /* add requester as GitHub collaborator on repo */
  async function addCollaborator(
    requesteeGitHub: string,
    requesterGitHub: string,
    gitHubRepo: string,
  ) {
    console.log(requesteeGitHub, requesterGitHub, gitHubRepo)
    // TD wrap in try/catch
    let res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}auth/gitHub/addCollaborator`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          requesteeGitHub: requesteeGitHub,
          requesterGitHub: requesterGitHub,
          gitHubRepo: gitHubRepo,
        }),
      },
    )
    if (res.status === 200) {
      console.log('add successful')
      const collaborators = await res.json()
      console.log(collaborators)
    } else console.log('Inviting collaborator failed.') // TD else action
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
    }
  }

  return (
    <div
      className={dynamicRequestStyle(props.requestProps?.status)}
      key={props.index}
    >
      <div className='header'>
        <span className='title'>
          <NavLink to={`/assets/${props.requestProps?.asset_data._id}`}>
            {props.requestProps?.asset_data.title}
          </NavLink>{' '}
          requested by{' '}
          <NavLink
            to={`/user/${props.requestProps?.requester_username}/assets`}
          >
            {props.requestProps?.requester_username}
          </NavLink>
        </span>
      </div>
      <div
        className='description'
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <span>
          User {props.requestProps?.requester_username} requests a swap for your
          asset {props.requestProps?.asset_data.title}.
        </span>
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
