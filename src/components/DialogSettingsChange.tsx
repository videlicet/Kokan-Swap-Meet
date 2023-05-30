import React, { useState, ChangeEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import './DialogSettingsChange.css'
import { useForm } from 'react-hook-form'

interface settingsChange {
  portalContainer?: HTMLElement | null
  user: any
  onSubmit: any // TODO type
  content: {
    title: string
    fields: {
      content: string
      defaultValue: string
      inputName: string
      validation: any
    }[]
  } // TODO type
}

const DialogSettingsChange: React.FC<settingsChange> = (
  props: settingsChange,
) => {
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const fields = props.content?.fields

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className='Button violet'>Change</button>
      </Dialog.Trigger>
      <Dialog.Portal container={props.portalContainer}>
        <Dialog.Overlay className='DialogOverlay' />
        <Dialog.Content className='DialogContent'>
          <form
            onSubmit={handleSubmit((data) => {
              props.onSubmit({
                data,
              })
              setOpen(false)
              reset()
            })}
          >
            <Dialog.Title className='DialogTitle'>
              Change {props.content.title}
            </Dialog.Title>
            <Dialog.Description className='DialogDescription'>
              Make changes to your profile settings and click "save settings" when you're done.
            </Dialog.Description>
            {fields.map((field, index: number) => {
              return (
                <fieldset className='Fieldset'>
                  <label className='Label' htmlFor={field.content}>
                    {field.content}
                  </label>
                  <input
                    {...register(field.inputName, field.validation)}
                    className='Input'
                    id={field.content}
                    name={field.inputName}
                    placeholder={field?.defaultValue}
                  />
                  {errors[`${field.inputName}`] && (
                    <p className='validation-error'>
                      {field.content} invalid.{' '}
                    </p>
                  )}
                </fieldset>
              )
            })}
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
