import React from 'react'
import * as Slider from '@radix-ui/react-slider'
import './SliderKokan.css'

interface Props {
  kokans: any
  handleKokans: (value: number[]) => void
}

const SliderKokan = (props: Props) => (
  <form>
    <span>{props.kokans}</span>
    <Slider.Root
      className='SliderRoot'
      {...(props as any)}
      min={1}
      max={5}
      defaultValue={[3]}
      step={1}
      onValueChange={(value) => props.handleKokans(value)}
    >
      <Slider.Track className='SliderTrack'>
        <Slider.Range className='SliderRange' />
      </Slider.Track>
      <Slider.Thumb className='SliderThumb' aria-label='Volume' />
    </Slider.Root>
  </form>
)

export default SliderKokan
