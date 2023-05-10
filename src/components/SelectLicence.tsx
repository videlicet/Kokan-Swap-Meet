import React from 'react'
import * as Select from '@radix-ui/react-select'
import './SelectLicence.css'
import classnames from 'classnames';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons'

interface propsInterface {
  handleChangeLicence: any;
  licence: string;
}

const SelectLicence = (props: propsInterface) => (
  <Select.Root onValueChange={props.handleChangeLicence}>
    <Select.Trigger className='SelectTrigger' aria-label='license' >
      <Select.Value placeholder={props.licence} />
      <Select.Icon className='SelectIcon'>
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>

    <Select.Portal>
      <Select.Content position='popper' className='SelectContent' arrowPadding={104}>
        <Select.Viewport className='SelectViewport'>
          <Select.Group>
            <SelectItem value="Apache License 2.0">Apache license 2.0</SelectItem>
            <SelectItem value="Boost Software License 1.0 ">Boost Software License 1.0 </SelectItem>
            <SelectItem value={`BSD 2-clause "Simplified" License`}>BSD 2-clause "Simplified" License</SelectItem>
            <SelectItem value={`BSD 3-clause "New" or "Revised" License`}>BSD 3-clause "New" or "Revised" License</SelectItem>
            <SelectItem value="GNU Affero General Public License v3.0">GNU Affero General Public License v3.0</SelectItem>
            <SelectItem value="GNU General Public License v3.0">GNU General Public License v3.0</SelectItem>
            <SelectItem value="GNU Lesser General Public License v3.0 »">GNU Lesser General Public License v3.0 »</SelectItem>
            <SelectItem value="MIT">MIT</SelectItem>
            <SelectItem value="Mozilla Public License 2.0 ">Mozilla Public License 2.0 </SelectItem>
            <SelectItem value="Open Software License 3.0">Open Software License 3.0</SelectItem>
            <SelectItem value="The Unlicense">The Unlicense</SelectItem>^
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select.Portal>
  </Select.Root>
)

const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames('SelectItem', className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className='SelectItemIndicator'>
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    )
  },
)

export default SelectLicence
