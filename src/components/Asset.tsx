import React from 'react'
import { useLinkClickHandler, useLocation } from 'react-router-dom'

interface Asset {
  assetProps: {
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
  index: number
}

const Asset: React.FC<Asset> = (props: Asset) => {
  const { pathname } = useLocation()

  return (
    <div className='asset' key={props.index}>
      <div className='header'>
        <div>
          <span className='title'>{props.assetProps.title}</span>
          <span className='kokans'>{props.assetProps.kokans}</span>
        </div>
        <span className='licence'>{props.assetProps.licence}</span>
      </div>
      <div className='description'>
        <span>{props.assetProps.description_short}</span>
      </div>
      <span>
        {props.assetProps.type.map((item) => (
          <span className='tag'>{item}</span>
        ))}
      </span>
      {pathname !== '/assets' && props.assetProps.onOffer && <div className="on-offer">ON OFFER</div>}
    </div>
  )
}
export default Asset
