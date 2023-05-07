import { useState, ChangeEvent, FormEvent } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/3_Assets.css'
import brand_icon from '../assets/kokan_icon_w.png'

/* import components */
import Asset from '../components/Asset.tsx'

import { mockAssets } from '../assets/mockAssets'
// import { mockUserLoggedIn } from '../assets/mockUsers.tsx'

function Assets(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('sdfsf')
  const [userAssets, setUserAssets] = useState(mockAssets)

  //getData(); make a request to get all of the documents

  return (
    <div id="assets">
        <div id="user-assets">
          {userAssets.map((item, index) => (
            <NavLink to={`/assets/${item.asset_id}`}>
              <Asset assetProps={item} index={index}></Asset>
            </NavLink>
          ))}
        </div>
    </div>
  )
}

export default Assets