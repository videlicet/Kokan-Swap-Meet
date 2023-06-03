import React from 'react'

/* import styles */
import './AlertDialog.css'

/* import components */
import * as AlertDialog from '@radix-ui/react-alert-dialog'

/* types */
interface Props {
  portalContainer: HTMLElement | null
  title: string
  onOffer: () => Promise<void>
  removeable: boolean
}

const AlertDialogAssetOffer: React.FC<Props> = (props: Props) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <button className='button-like'>
        {props.removeable ? 'Revoke' : 'Offer'}
      </button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal container={props.portalContainer}>
      <AlertDialog.Overlay className='AlertDialogOverlay' />
      <AlertDialog.Content className='AlertDialogContent'>
        <AlertDialog.Title className='AlertDialogTitle'>
          {props.removeable
            ? 'Please confirm you want to revoke this offer on Kokan'
            : 'Please confirm you want to offer this asset on Kokan'}
        </AlertDialog.Title>
        <AlertDialog.Description className='AlertDialogDescription'>
          {props.removeable
            ? 'Revoke offer of asset '
            : 'Offer asset '}
            <span style={{ color: 'red' }}>{props.title}</span>.
        </AlertDialog.Description>
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
            <button>Cancel</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button onClick={props.onOffer}>Confirm</button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
)

export default AlertDialogAssetOffer
