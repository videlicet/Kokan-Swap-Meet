import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

/* import styles */
import './DialogSettingsChange.css'

/* import components */
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

/* types */
interface Props {
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

const DialogSettingsChange: React.FC<Props> = (
  props: Props,
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
                <fieldset key={index} className='Fieldset'>
                  <label className='Label' htmlFor={field.content}>
                    {field.content}
                  </label>
                  <input
                    {...register(field.inputName, field.validation)}
                    className='Input'
                    id={field.content}
                    name={field.inputName}
                    placeholder={field?.defaultValue}
                    type={field.inputName === 'password' ? 'password' : field.inputName === 'email' ?  'email' : undefined}
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
