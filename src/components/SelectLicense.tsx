import React from 'react'
import * as Select from '@radix-ui/react-select'
import './SelectLicense.css'
import classnames from 'classnames'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'

interface propsInterface {
  handleChangeLicence: any
  licenseTypes: string[]
  license: string
}

const SelectLicence = (props: propsInterface) => (
  <Select.Root onValueChange={props.handleChangeLicence}>
    <Select.Trigger className='SelectTrigger' aria-label='license'>
      <Select.Value placeholder={props.license} />
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
            {props.licenseTypes.map((license) => (
              <Select.Item value={license}>
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
)

export default SelectLicence
