import { forwardRef } from 'react'

/* import styles */
import './SelectLicense.css'

/* import components */
import * as Select from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'

/* types */
interface propsInterface {
  tag: string
  value: string
  forwardedRef: any // TODO typing
  onValueChange: (...event: any[]) => void
}

const SelectSearchTag = forwardRef<HTMLButtonElement, propsInterface>(
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
                <Select.Item value="assets">
                  <Select.ItemText> Assets</Select.ItemText>
                  <Select.ItemIndicator className='SelectItemIndicator'>
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
                <Select.Item value="tags">
                  <Select.ItemText> Tags</Select.ItemText>
                  <Select.ItemIndicator className='SelectItemIndicator'>
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
                <Select.Item value="users">
                  <Select.ItemText> Users</Select.ItemText>
                  <Select.ItemIndicator className='SelectItemIndicator'>
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  ),
)

export default SelectSearchTag
