import React, { useState, useEffect, useContext, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

/* import components */
import AlertDialogRequest from './AlertDialogRequest'

/* import context */
import { UserContext, PortalContext } from '../routes/1_App'

/* import types */
import { RequestInterface } from '../assets/mockRequests'

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
      if (res.status === 200) {
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
                  brokers: props.requestProps.requester._id,
                },
              },
            }),
          },
        )

        /* update requestee kokans */
        await fetch(`${import.meta.env.VITE_SERVER_URL}users/${user._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: { _id: user._id },
            update: {
              changes: {
                kokans: user.kokans + props.requestProps.asset_id.kokans,
              },
            },
          }),
        })

        /* update requester kokans  */
        await fetch(
          `${import.meta.env.VITE_SERVER_URL}users/${
            props.requestProps.requester._id
          }`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user: { _id: props.requestProps.requester._id },
              update: {
                changes: {
                  kokans:
                    props.requestProps.requester.kokans -
                    props.requestProps.asset_id.kokans,
                },
              },
            }),
          },
        )

        /* update user (aka requestee) state */
        setUser({
          ...user,
          kokans: user.kokans + props.requestProps.asset_id.kokans,
        })

        /* aggregate a transaction with the relevant usernames of requester and requestees and the gitHub repo name*/
        // TH this should be done on the parent component, right?
        const [aggregatedTransactions] = await aggregateTransactions(
          props.requestProps._id,
        )
        console.log(aggregatedTransactions)

        /* add requester as GitHub collaborator on repo */
        addCollaborator(user.username, aggregatedTransactions.requester_username, aggregatedTransactions.asset_data.gitHub_repo) // TD parameters to github names

        navigate(`/user/${user.username}/requests/incoming`)
      }
    } catch (err) {
      // TD errHandling
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
    }
  }

  /* aggregate a transaction with the relevant usernames of requester and requestees and the gitHub repo name*/
  async function aggregateTransactions(transaction_id: any) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}transactions/test/users`,
        {
          // TD remove "test"
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ transaction_id: transaction_id }),
        },
      )
      let aggregatedTransaction = await res.json()
      console.log('aggregatedTransaction:')
      console.log(aggregatedTransaction)
      return aggregatedTransaction
    } catch (err) {
      console.log('Aggregation failed.')
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
    } else console.log('add failed') // TD else action
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
      <div className='description'>
        <span>
          User {props.requestProps?.requester_username} requests a swap for your
          asset {props.requestProps?.asset_data.title}.
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
