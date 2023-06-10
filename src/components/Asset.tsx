import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'

/* import styles */
import './Asset.css'

/* import context */
import { UserContext } from '../routes/1_App'

/* import types */
import { AssetInterface } from '../types/types'

/* types */
interface Props {
  assetProps: AssetInterface
  user_kokans: number
  index: number
}

const Asset: React.FC<Props> = (props: Props) => {
  const { user, setUser } = useContext<any>(UserContext)
  const { pathname } = useLocation()

  const pricey =
    (pathname === '/assets' || !pathname.includes(user?.username)) &&
    user?.kokans < props.assetProps.kokans
      ? {
          backgroundColor: 'grey',
        }
      : undefined

  return (
    <div className='asset' key={props.assetProps._id}>
      <div className='left'>
        <p>
          <span className='kokans' style={pricey}>
            {props.assetProps.kokans}
          </span>
          <span className='title'>{props.assetProps.title}</span>
        </p>
        <div className='description' style={{ marginBottom: '1rem' }}>
          <span>{props.assetProps.description_short}</span>
        </div>
      </div>

      <div className='asset-footer' style={{ marginTop: '0' }}>
        <div className='additional-info'>
          <span className='info-type'>Tags</span>
          <div className='tag-container'>
            {props.assetProps.tags.map((tag: string, index: number) => (
              <span className='info' key={index}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className='additional-info'>
          <span className='info-type'>License</span>
          <span className='info'>{props.assetProps.licence}</span>
        </div>
        {pathname !== '/assets' && props.assetProps.onOffer && (
          <span className='on-offer'>on offer</span>
        )}
      </div>
    </div>
  )
}
export default Asset
