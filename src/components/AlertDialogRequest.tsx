// @ts-nocheck
import React from 'react'

/* import styles */
import './AlertDialog.css'

/* import components */
import * as AlertDialog from '@radix-ui/react-alert-dialog'

/* types */
interface Props {
  portalContainer: HTMLElement | null,
  onConfirm: any // type?
  content: {
    button: {
      button: string,
      confirm: string,
      cancel: string
    },
    title: string,
    description: string
  }
}

const AlertDialogRequest: React.FC<Props> = (props: Props) => (
  <AlertDialog.Root className='AlertDialogRoot'>
    <AlertDialog.Trigger asChild>
      <button className='button-like'>{props.content.button.button}</button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal container={props.portalContainer}>
      <AlertDialog.Overlay className='AlertDialogOverlay' />
      <AlertDialog.Content className='AlertDialogContent'>
        <AlertDialog.Title className='AlertDialogTitle'>
          {props.content.title}
        </AlertDialog.Title>
        <AlertDialog.Description className='AlertDialogDescription'>
            {props.content.description}
        </AlertDialog.Description>
        <div style={{ display: 'flex', gap: 25, justifyContent: 'space-between' }}>
          <AlertDialog.Cancel asChild>
            <button>{props.content.button.cancel}</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button onClick={props.onConfirm}>{props.content.button.confirm}</button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
)

export interface AlertDialogRequestContent {
  title: string,
  description: string,
  button: {
    button: string,
    confirm: string,
    cancel: string
  }
}

export default AlertDialogRequest
