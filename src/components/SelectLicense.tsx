import { forwardRef } from 'react'

/* import styles */
import './SelectLicense.css'

/* import components */
import * as Select from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'

/* types */
interface propsInterface {
  licenseTypes: string[]
  license: string
  value: string
  forwardedRef: any // TODO typing
  onValueChange: (...event: any[]) => void
}

const SelectLicence = forwardRef<HTMLButtonElement, propsInterface>(
  ({ ...props }: propsInterface, forwardedRef) => (
    <Select.Root value={props.value} onValueChange={props.onValueChange}>
      <Select.Trigger
        className='SelectTrigger'
        ref={forwardedRef}
        aria-label='license'
      >
        {' '}
        <Select.Value>
          <span>{props.value ?? 'Select license'}</span>
        </Select.Value>
        <Select.Icon className='SelectIcon'>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position='popper'
          className='SelectContent'
          arrowPadding={104}
        >
          <Select.Viewport className='SelectViewport'>
            <Select.Group>
              {props.licenseTypes.map((license: string, index: number) => (
                <Select.Item value={license} key={index}>
                  <Select.ItemText> {license}</Select.ItemText>
                  <Select.ItemIndicator className='SelectItemIndicator'>
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  ),
)

export default SelectLicence
