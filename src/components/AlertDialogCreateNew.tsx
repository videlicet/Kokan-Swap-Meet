import React from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import './AlertDialog.css'

import brand_icon from '../assets/kokan_icon_w.png'

interface createNewAsset {
  portalContainer: HTMLElement | null
  onSubmitTrigger: any // type?
  title: string
  kokans: number
}

const AlertDialogCreateNew: React.FC<createNewAsset> = (
  props: createNewAsset,
) => (
  <AlertDialog.Root className='AlertDialogRoot'>
    <AlertDialog.Trigger asChild>
      <button className='button-like'>create</button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal container={props.portalContainer}>
      <AlertDialog.Overlay className='AlertDialogOverlay' />
      <AlertDialog.Content className='AlertDialogContent'>
        <AlertDialog.Title className='AlertDialogTitle'>
          Please confirm you want to create and publish this asset.
        </AlertDialog.Title>
        <AlertDialog.Description className='AlertDialogDescription'>
          <p>
            Create "{props.title}" for <img src={brand_icon} alt='kokans' height='20px' style={{position: "relative", top: "0.3rem", marginLeft: "0.2rem"}} /> {props.kokans}
          </p>
        </AlertDialog.Description>
        <div
          style={{ display: 'flex', gap: 25, justifyContent: 'space-between' }}
        >
          <AlertDialog.Cancel asChild>
            <button>Cancel</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button onClick={props.onSubmitTrigger}>Confirm</button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
)

export default AlertDialogCreateNew
