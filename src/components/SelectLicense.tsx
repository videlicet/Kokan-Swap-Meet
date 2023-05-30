// @ts-nocheck
import {forwardRef} from 'react'
import './SelectLicense.css'

/* import components */
import * as Select from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'

interface propsInterface {
  licenseTypes: string[]
  license: string,
  value: string,
  forwardedRef: any // TD
  onValueChange: (...event: any[]) => void
}

const SelectLicence = forwardRef(({ ...props}: propsInterface , forwardedRef,) => (
  <Select.Root value={props.value} onValueChange={props.onValueChange}>
    <Select.Trigger className='SelectTrigger' ref={forwardedRef} aria-label='license'> {/* TODO type */}
      <Select.Value>
      <span>{props.value ?? "Select license"}</span>
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
))

export default SelectLicence
