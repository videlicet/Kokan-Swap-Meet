import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { NavLink, useOutletContext } from 'react-router-dom'
import '../styles/2_User.css'
import brand_icon from '../assets/kokan_icon_w.png'

/* import components */
import Asset from '../components/Asset.tsx'

import serverURL from '../../server_URL'

/* function component */
function UserAssets(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [user, setUser] = useOutletContext() as any[]
  const [userAssets, setUserAssets] = useState<any>([])

  async function getData() {
    try {
      const res = await fetch(`${serverURL}users/${user.username}/assets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({owner: user._id}),
      })
      if (res.status == 200) {
        const userAssets = await res.json()
        setUserAssets(userAssets);
      }
    } catch (error) {
      //errorHandling
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div id='user-assets'>
      {userAssets.map((item: any, index: number) => (
        <NavLink to={`/assets/${item.asset_id}`} className='unstyledLink'>
          <Asset assetProps={item} index={index}></Asset>
        </NavLink>
      ))}
    </div>
  )
}

export default UserAssets
