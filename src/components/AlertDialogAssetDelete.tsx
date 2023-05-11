import React from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import './AlertDialog.css'

interface swapRequest {
  portalContainer: HTMLElement | null
  title: string
  onDelete: any // type?
}

const AlertDialogAssetDelete: React.FC<swapRequest> = (props: swapRequest) => (
  <AlertDialog.Root className='AlertDialogRoot'>
    <AlertDialog.Trigger asChild>
      <button className='button-like'>delete</button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal container={props.portalContainer}>
      <AlertDialog.Overlay className='AlertDialogOverlay' />
      <AlertDialog.Content className='AlertDialogContent'>
        <AlertDialog.Title className='AlertDialogTitle'>
          Please confirm you want to delete this asset.
        </AlertDialog.Title>
        <AlertDialog.Description className='AlertDialogDescription'>
          <p>
            Delete asset <span style={{color: "red"}}>{props.title}</span>.
          </p>
        </AlertDialog.Description>
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
            <button>Cancel</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button onClick={props.onDelete}>Delete</button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
)

export default AlertDialogAssetDelete
