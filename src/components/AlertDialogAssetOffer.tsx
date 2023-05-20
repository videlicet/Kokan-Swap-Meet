// @ts-nocheck
import React from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import './AlertDialog.css'

interface offerRequest {
  portalContainer: HTMLElement | null
  title: string
  onOffer: any // type?
  removeable: boolean
}

const AlertDialogAssetOffer: React.FC<offerRequest> = (props: offerRequest) => (
  <AlertDialog.Root className='AlertDialogRoot'>
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
          <p>
          {props.removeable
            ? 'Revoke offer of asset '
            : 'Offer asset '}
            <span style={{ color: 'red' }}>{props.title}</span>.
          </p>
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
