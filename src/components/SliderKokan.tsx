import './SliderKokan.css'

/* import components */
import * as Slider from '@radix-ui/react-slider'
import brand_icon from '../assets/kokan_icon_w.png'

interface Props {
  kokans: number
  handlekokans: (value: number[]) => void
}

const SliderKokan = (props: Props) => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: "center" }}>

      <Slider.Root
        className='SliderRoot'
        {...(props as any)}
        min={1}
        max={5}
        defaultValue={[3]}
        step={1}
        onValueChange={(value) => props.handlekokans(value)}
      >
        <Slider.Track className='SliderTrack'>
          <Slider.Range className='SliderRange' />
        </Slider.Track>
        <Slider.Thumb className='SliderThumb' aria-label='Volume'>
       {props.kokans}
        </Slider.Thumb>
        <img
        src={brand_icon}
        alt='kokans'
        height='20px'
        style={{
          position: 'relative', left: "1.5rem"
        }}
      />
      </Slider.Root>

  </div>
)

export default SliderKokan