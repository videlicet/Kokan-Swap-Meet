import React from 'react'

interface Asset {
  assetProps: {
    name: string
    kokans: number
    creator: string
    created: string
    owners: string[]
    type: string[]
    description_short: string
    description_long: string
    licence: string
  }
  index: number
}

const Asset: React.FC<Asset> = (props: Asset) => (
  <div className='asset' key={props.index}>
    <div className='header'>
      <div>
        <span className='title'>{props.assetProps.name}</span>
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
  </div>
)

export default Asset
