import React from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import './AlertDialog.css'

interface swapRequest {
  portalContainer: HTMLElement | null
  price: number
  onSwap: any // type?
}

const AlertDialogSwap: React.FC<swapRequest> = (props: swapRequest) => (
  <AlertDialog.Root className='AlertDialogRoot'>
    <AlertDialog.Trigger asChild>
      <button className='button-like'>swap</button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal container={props.portalContainer}>
      <AlertDialog.Overlay className='AlertDialogOverlay' />
      <AlertDialog.Content className='AlertDialogContent'>
        <AlertDialog.Title className='AlertDialogTitle'>
          Please confirm your request to swap this asset.
        </AlertDialog.Title>
        <AlertDialog.Description className='AlertDialogDescription'>
          <p>
            Kokan balance: <span>{props.price}</span>
          </p>
        </AlertDialog.Description>
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
            <button>Cancel</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button onClick={props.onSwap}>Yes, send a swap request!</button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
)

export default AlertDialogSwap