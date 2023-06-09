import { useState, useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

/* import styles */
import '../styles/3_Assets.css'

/* import components */
import Asset from '../components/Asset.tsx'
import Loading from '../components/Loading.tsx'

/* import context */
import { AssetContext, UserContext } from './1_App.tsx'

function Assets(): JSX.Element {
  const [loading, setLoading] = useState(true)
  const [assets, setAssets] = useState([])
  const navigate = useNavigate()
  const { user } = useContext<any>(UserContext)
  const { searchTermHandle } = useContext<any>(AssetContext)

  async function getAssets() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}assets/search`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({ asset: { searchTerm: searchTermHandle } }),
        },
      )
      if (res.status === 200) {
        const data = await res.json()
        const onOffer = data.filter((asset: any) => asset.onOffer === true)
        setAssets(onOffer)
      } else {
        setAssets([])
      }
    } catch (err) {
      setAssets([])
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      getAssets()
    }
  }, [searchTermHandle])

  return (
    <div id='assets'>
      {!loading ? (
        (assets.length > 0 &&
          assets.map((item: any, index: number) => (
            <NavLink key={index} to={`/assets/${item._id}`}>
              <Asset
                assetProps={item}
                index={index}
                user_kokans={user?.kokans}
              ></Asset>
            </NavLink>
          ))) || (
          <div className='asset' style={{ height: '5rem' }}>
            No matching assets.
          </div>
        )
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Assets
