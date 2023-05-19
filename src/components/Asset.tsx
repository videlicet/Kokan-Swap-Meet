import React from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/3.1_Assets_Detail.css'

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
      <div>
        <div className='header'>
          <div>
            <span className='title'>{props.assetProps.title}</span>
            <span className='kokans'>{props.assetProps.kokans}</span>
          </div>
        </div>
        <div className='description' style={{marginBottom: "1rem"}}>
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
          <span className='on-offer'>ON OFFER</span>
        )}
      </div>
    </div>
  )
}
export default Asset
