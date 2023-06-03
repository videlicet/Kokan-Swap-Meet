import React from 'react'

/* import styles */
import './AlertDialog.css'

/* import components */
import * as AlertDialog from '@radix-ui/react-alert-dialog'

/* types */
interface Props {
  onConfirm: any // TODO type?
  portalContainer?: HTMLElement | null
  disabled?: boolean
}

const AlertDialogImageUpload: React.FC<Props> = (props: Props) => {
  const triggerButtonStyle = props.disabled
    ? {
        backgroundColor: 'grey',
        color: 'rgb(0, 0, 0)',
        cursor: 'auto',
        textDecoration: 'line-through',
      }
    : undefined

  return (
    <AlertDialog.Root>
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
            Please confirm you want to change your profile picture
          </AlertDialog.Title>
          <AlertDialog.Description className='AlertDialogDescription'>
              Your profile picture will be updated on confirmation. If you want
              your default GitHub profile picture back, please reupload it
              through this form.
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
