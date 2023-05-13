import React, { useState, ChangeEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import './DialogSettingsChange.css'
import { useRoutes } from 'react-router-dom'

interface settingsChange {
  portalContainer: HTMLElement | null
  user: any
  onSubmit: any // TD type
  content: any // TD type
}

const DialogSettingsChange: React.FC<settingsChange> = (
  props: settingsChange,
) => {
  const [open, setOpen] = useState(false)
  const [changes, setChanges] = useState({ fieldFirst: '', fieldSecond: '' })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value)
    setChanges({ ...changes, [`${event.target.name}`]: event.target.value })
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className='Button violet'>Change</button>
      </Dialog.Trigger>
      <Dialog.Portal container={props.portalContainer}>
        <Dialog.Overlay className='DialogOverlay' />
        <Dialog.Content className='DialogContent'>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              props.onSubmit({
                first: changes.fieldFirst,
                second: changes.fieldSecond,
              })
              setOpen(false)
            }}
          >
            <Dialog.Title className='DialogTitle'>
              Change {props.content.title}
            </Dialog.Title>
            <Dialog.Description className='DialogDescription'>
              Make changes to your profile here. Click save when you're done.
            </Dialog.Description>
            <fieldset className='Fieldset'>
              <label className='Label' htmlFor={props.content.fields.first}>
                {props.content.fields.first}
              </label>
              <input
                className='Input'
                id={props.content.fields.first}
                name={'fieldFirst'}
                value={changes.fieldFirst}
                onChange={handleChange}
              />
            </fieldset>
            {props.content.fields.second && (
              <fieldset className='Fieldset'>
                <label className='Label' htmlFor='username'>
                  {props.content.fields.second}
                </label>
                <input
                  className='Input'
                  id={props.content.fields.second}
                  name={'fieldSecond'}
                  value={changes.fieldSecond}
                  onChange={handleChange}
                />
              </fieldset>
            )}

            <div
              style={{
                display: 'flex',
                marginTop: 25,
                justifyContent: 'flex-end',
              }}
            >
              <button type='submit'>Save changes</button>
            </div>
            <Dialog.Close asChild>
              <button className='IconButton' aria-label='Close'>
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default DialogSettingsChange
