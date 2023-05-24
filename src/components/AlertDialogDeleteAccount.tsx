// @ts-nocheck
import React from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import './AlertDialog.css'

interface deleteRequest {
  portalContainer: HTMLElement | null
  username: string
  onDelete: any // TD type?
}

const AlertDialogSwap: React.FC<deleteRequest> = (props: deleteRequest) => (
  <AlertDialog.Root className='AlertDialogRoot'>
    <AlertDialog.Trigger asChild>
      <button>Delete Account</button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal container={props.portalContainer}>
      <AlertDialog.Overlay className='AlertDialogOverlay' />
      <AlertDialog.Content className='AlertDialogContent'>
        <AlertDialog.Title className='AlertDialogTitle'>
          Please confirm you want to delete your Account.
        </AlertDialog.Title>
        <AlertDialog.Description className='AlertDialogDescription'>
          <p>
            Are you sure you want to delete your{' '}
            <span style={{ color: 'red' }}>{props.username}</span> account
            permanently? All of your kokans and assets will be deleted.
          </p>
        </AlertDialog.Description>
        <div
          style={{ display: 'flex', gap: 25, justifyContent: 'space-between' }}
        >
          <AlertDialog.Cancel asChild>
            <button>Cancel</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button onClick={props.onDelete}>delete my account</button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
)

export default AlertDialogSwap
