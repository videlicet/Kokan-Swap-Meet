import React from 'react'

/* import styles */
import './AlertDialog.css'

/* import components */
import * as AlertDialog from '@radix-ui/react-alert-dialog'

/* types */
interface Props {
  portalContainer: HTMLElement | null
  price: number
  onSwap: any // type?
  disabled: boolean
}

const AlertDialogAssetSwap: React.FC<Props> = (props: Props) => {
  const triggerButtonStyle = props.disabled ? {
    backgroundColor: "grey",
    color: "rgb(0, 0, 0)",
    cursor: "auto",
    textDecoration: "line-through",
  } : undefined

  return (
    <AlertDialog.Root>
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
            Please confirm your request to swap this asset
          </AlertDialog.Title>
          <AlertDialog.Description className='AlertDialogDescription'>
              Do you want to make a swap request for this asset for <span>{props.price}</span> Kokans?
          </AlertDialog.Description>
          <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
            <AlertDialog.Cancel asChild>
              <button>Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button onClick={props.onSwap}>Request</button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export default AlertDialogAssetSwap
