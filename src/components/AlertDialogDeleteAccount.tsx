import React from 'react'

/* import styles */
import './AlertDialog.css'

/* import components */
import * as AlertDialog from '@radix-ui/react-alert-dialog'

/* types */
interface Props {
  portalContainer: HTMLElement | null
  username: string
  onDelete: any // TODO type?
}

const AlertDialogSwap: React.FC<Props> = (props: Props) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <button>Delete Account</button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal container={props.portalContainer}>
      <AlertDialog.Overlay className='AlertDialogOverlay' />
      <AlertDialog.Content className='AlertDialogContent'>
        <AlertDialog.Title className='AlertDialogTitle'>
          Please confirm you want to delete your Account
        </AlertDialog.Title>
        <AlertDialog.Description className='AlertDialogDescription'>
          Are you sure you want to delete your{' '}
          <span style={{ color: 'red' }}>{props.username}</span> account
          permanently? All of your kokans and assets will be deleted.
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
