// @ts-nocheck
import React from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import './AlertDialog.css'

interface swapRequest {
  portalContainer: HTMLElement | null
  price: number
  onSwap: any // type?
  disabled: boolean
}

const AlertDialogAssetSwap: React.FC<swapRequest> = (props: swapRequest) => {
  const triggerButtonStyle = props.disabled ? {
    backgroundColor: "grey",
    color: "rgb(0, 0, 0)",
    cursor: "auto",
    textDecoration: "line-through",
  } : undefined

  return (
    <AlertDialog.Root className='AlertDialogRoot'>
      <AlertDialog.Trigger asChild>
        <button
          className='button-like'
          disabled={props.disabled}
          style={triggerButtonStyle}
        >
          Swap
        </button>
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
              <button onClick={props.onSwap}>Swap</button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export default AlertDialogAssetSwap
