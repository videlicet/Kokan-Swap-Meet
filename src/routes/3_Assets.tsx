import { useState, useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/3_Assets.css'
import serverURL from '../../server_URL.ts'

/* import components */
import Asset from '../components/Asset.tsx'

/* import context */

import { AssetContext } from './1_App'

function Assets(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [assets, setAssets] = useState([])

  const { searchTermHandle, setSearchTermHandle } = useContext<any>(AssetContext)

  async function getAssets() {
    console.log(searchTermHandle)
    try {
      const res = await fetch(`${serverURL}assets/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ asset: { searchTerm: searchTermHandle } }),
      })
      if (res.status === 200) {
        const data = await res.json()
        const onOffer = data.filter((asset: any) => asset.onOffer === true)
        setAssets(onOffer)
      }
    } catch (error) {
      // TD errorHandling
    }
  }

  useEffect(() => {
    getAssets()
  }, [])

  return (
    <div id='assets'>
      <div id='user-assets'>
        {assets.map((item: any, index) => (
          <NavLink to={`/assets/${item._id}`}>
            <Asset assetProps={item} index={index}></Asset>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Assets
