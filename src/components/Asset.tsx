import React from 'react'
import { useLinkClickHandler, useLocation } from 'react-router-dom'
import * as Separator from '@radix-ui/react-separator'

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
      <Separator.Root
        className='SeparatorRoot'
      />
      <div className='asset-footer'>
        {props.assetProps.type.map((item) => (
          <span className='tag'>{item}</span>
        ))}

        {pathname !== '/assets' && props.assetProps.onOffer && (
          <span className='on-offer'>ON OFFER</span>
        )}
      </div>
    </div>
  )
}
export default Asset
