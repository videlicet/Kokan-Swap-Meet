import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import '../styles/3_Assets.css'
import brand_icon from '../assets/kokan_icon_w.png'
import serverURL from '../../server_URL.ts'

/* import components */
import Asset from '../components/Asset.tsx'

import { mockAssets } from '../assets/mockAssets'
// import { mockUserLoggedIn } from '../assets/mockUsers.tsx'

function Assets(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('')
  const [userAssets, setUserAssets] = useState([])

  async function getData () {
    try {
      const { data } = await axios.get(`${serverURL}assets`);
      console.log(data[0].asset_id)
      setUserAssets(data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Axios error: ' + error);
      } else {
        console.log('General error: ' + error);
      }
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div id="assets">
        <div id="user-assets">
          {userAssets.map((item: any, index) => (
            <NavLink to={`/assets/${item.asset_id}`}>
              <Asset assetProps={item} index={index}></Asset>
            </NavLink>
          ))}
        </div>
    </div>
  )
}

export default Assets