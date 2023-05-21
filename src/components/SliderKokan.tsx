import React from 'react'
import * as Slider from '@radix-ui/react-slider'
import './SliderKokan.css'
import brand_icon from '../assets/kokan_icon_w_y.png'

interface Props {
  kokans: any
  handleKokans: (value: number[]) => void
}

const SliderKokan = (props: Props) => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: "center" }}>
    <div className="info-box">
      <span style={{display: "block", width: "0.7rem", textAlign: "center"}}>{props.kokans}</span>
    </div>
    <form>
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
        <Slider.Thumb className='SliderThumb' aria-label='Volume'>
        <img
        src={brand_icon}
        alt='kokans'
        height='20px'
        style={{
          position: 'relative',
        }}
      />
        </Slider.Thumb>
      </Slider.Root>
    </form>
  </div>
)

export default SliderKokan
