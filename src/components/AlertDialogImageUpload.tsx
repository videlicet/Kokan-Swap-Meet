// @ts-nocheck
import React from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import './AlertDialog.css'

interface swapRequest {
  portalContainer: HTMLElement | null
  onConfirm: any // TODO type?
  disabled: boolean
}

const AlertDialogImageUpload: React.FC<swapRequest> = (props: swapRequest) => {
  const triggerButtonStyle = props.disabled
    ? {
        backgroundColor: 'grey',
        color: 'rgb(0, 0, 0)',
        cursor: 'auto',
        textDecoration: 'line-through',
      }
    : undefined

  return (
    <AlertDialog.Root className='AlertDialogRoot'>
      <AlertDialog.Trigger asChild>
        <button
          className='button-like'
          disabled={props.disabled}
          style={triggerButtonStyle}
        >
          Upload
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal container={props.portalContainer}>
        <AlertDialog.Overlay className='AlertDialogOverlay' />
        <AlertDialog.Content className='AlertDialogContent'>
          <AlertDialog.Title className='AlertDialogTitle'>
            Please confirm you want to change your profile picture.
          </AlertDialog.Title>
          <AlertDialog.Description className='AlertDialogDescription'>
            <p>
              Your profile picture will be updated on confirmation. If you want
              your default GitHub profile picture back, please reupload it
              through this form.
            </p>
          </AlertDialog.Description>
          <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
            <AlertDialog.Cancel asChild>
              <button>Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button onClick={props.onConfirm}>Confirm</button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export default AlertDialogImageUpload
