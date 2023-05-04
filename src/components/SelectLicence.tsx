import * as Select from '@radix-ui/react-select'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons'

const SelectLicence = () => (
  <Select.Root>
    <Select.Trigger className='SelectTrigger' aria-label='licence'>
      <Select.Value placeholder='Licence' />
      <Select.Icon className='SelectIcon'>
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>

    <Select.Portal>
      <Select.Content className="SelectContent">
        <Select.ScrollUpButton className="SelectScrollButton">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="SelectViewport">
          <Select.Group>
            <Select.Item value='MIT'>MIT</Select.Item>
            <Select.Item value='MIT'>MIT</Select.Item>
            <Select.Item value='MIT'>MIT</Select.Item>
            <Select.Item value='MIT'>MIT</Select.Item>
            <Select.Item value='MIT'>MIT</Select.Item>
            <Select.Item value='MIT'>MIT</Select.Item>
            <Select.Item value='MIT'>MIT</Select.Item>
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="SelectScrollButton">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
        <Select.Arrow />
      </Select.Content>
    </Select.Portal>
  </Select.Root>
)

export default SelectLicence
