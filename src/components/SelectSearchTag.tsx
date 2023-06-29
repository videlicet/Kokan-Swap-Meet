import { forwardRef } from 'react'

/* import styles */
import './SelectSearchTag.css'

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
        className='SelectTagTrigger'
        ref={forwardedRef}
        aria-label='tag'
      >
        <Select.Value>
          <span>{props.value}</span>
        </Select.Value>
        <Select.Icon className='SelectTagIcon'>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position='popper'
          className='SelectTagContent'
          arrowPadding={104}
        >
          <Select.Viewport className='SelectTagViewport'>
            <Select.Group>
              <Select.Item className='SelectTagItem' value='assets'>
                <Select.ItemText>
                  <span className='SelectTagItemText'>Assets</span>
                </Select.ItemText>
              </Select.Item>
              <Select.Item className='SelectTagItem' value='tags'>
                <Select.ItemText>
                  <span className='SelectTagItemText'>Tags</span>
                </Select.ItemText>
              </Select.Item>
              <Select.Item className='SelectTagItem' value='users'>
                <Select.ItemText>
                  Users
                </Select.ItemText>
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
