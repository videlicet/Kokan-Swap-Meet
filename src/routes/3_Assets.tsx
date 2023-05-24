import { useState, useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/3_Assets.css'

/* import components */
import Asset from '../components/Asset.tsx'

/* import context */
import { AssetContext, UserContext } from './1_App'

function Assets(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [assets, setAssets] = useState([])
  
  const { user } = useContext<any>(UserContext)
  const { searchTermHandle } = useContext<any>(AssetContext)

  async function getAssets() {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}assets/search`, {
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
  }, [searchTermHandle])

  return (
    <div id='assets' className="asset-overview">
      {loading && 'render'}
        {assets.length > 0 && assets.map((item: any, index) => (
          <NavLink to={`/assets/${item._id}`}>
            <Asset assetProps={item} index={index} user_kokans={user?.kokans}></Asset>
          </NavLink>
        )) || <div className="asset" style={{height: "5rem"}}>No matching assets.</div>}
    </div>
  )
}

export default Assets
