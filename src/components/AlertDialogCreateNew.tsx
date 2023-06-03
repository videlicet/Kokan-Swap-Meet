import React, { useState } from 'react'

/* import styles */
import './AlertDialog.css'

/* import components */
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import brand_icon from '../assets/kokan_icon_w.png'

/* types */
interface Props {
  portalContainer: HTMLElement | null
  onSubmitTrigger: any // TODO type
  title: readonly any[]
  kokans: number
  trigger: any // TODO type
}

const AlertDialogCreateNew: React.FC<Props> = (props: Props) => {
  const [valid, setValid] = useState(true)
  return (
    <AlertDialog.Root
      onOpenChange={async () => {
        const result = await props.trigger([
          'title',
          'descriptionLong',
          'descriptionShort',
          'kokans',
          'repo',
          'license',
        ])
        setValid(result)
      }}
    >
      {' '}
      {/* className is used on root in the doc, why is throwing a type error */}
      <AlertDialog.Trigger asChild>
        <button className='button-like'>create</button>
      </AlertDialog.Trigger>
      {valid && (
        <AlertDialog.Portal container={props.portalContainer}>
          <AlertDialog.Overlay className='AlertDialogOverlay' />
          <AlertDialog.Content className='AlertDialogContent'>
            <AlertDialog.Title className='AlertDialogTitle'>
              Please confirm you want to create and publish this asset
            </AlertDialog.Title>
            <AlertDialog.Description className='AlertDialogDescription'>
              Create new asset {props.title} for{' '}
              <img
                src={brand_icon}
                alt='kokans'
                height='20px'
                style={{
                  position: 'relative',
                  top: '0.3rem',
                  marginLeft: '0.2rem',
                }}
              />{' '}
              {props.kokans}
            </AlertDialog.Description>
            <div
              style={{
                display: 'flex',
                gap: 25,
                justifyContent: 'space-between',
              }}
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
      )}
    </AlertDialog.Root>
  )
}

export default AlertDialogCreateNew
