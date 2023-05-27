import React from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import '../styles/3.1_Assets_Detail.css'

interface Asset {
  assetProps: {
    _id: string
    title: string
    kokans: number
    creator: string
    created: string
    owners: string[]
    onOffer: boolean
    type: string[]
    description_short: string
    description_long: string
    licence: string
  }
  user_kokans: number
  index: number
}

const Asset: React.FC<Asset> = (props: Asset) => {
  const { pathname } = useLocation()

  const pricey =
    (pathname === '/assets' || pathname.includes('/user')) && props.user_kokans < props.assetProps.kokans
      ? {
          backgroundColor: 'grey',
        }
      : undefined

  return (
    <div className='asset' key={props.index}>
      <div className='left'>
        <div>
          <NavLink
            to={`/assets/${props.assetProps._id}`}
            className='unstyledLink'
          >
            <p>
              <span className='title'>{props.assetProps.title}</span>
              <span className='kokans' style={pricey}>
                {props.assetProps.kokans}
              </span>
            </p>
          </NavLink>
        </div>
        <div className='description' style={{ marginBottom: '1rem' }}>
          <span>{props.assetProps.description_short}</span>
        </div>
      </div>

      <div className='asset-footer' style={{ marginTop: '0' }}>
        <div className='additional-info'>
          <span className='info-type'>Type</span>
          {props.assetProps.type.map((item) => (
            <span className='info'>{item}</span>
          ))}
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
