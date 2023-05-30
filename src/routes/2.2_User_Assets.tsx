import { useState, useEffect, useContext } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import '../styles/2.2_User_Assets.css'

/* import components */
import Asset from '../components/Asset.tsx'
import Loading from '../components/Loading'

/* import context */
import { UserContext } from './1_App'

function UserAssets(): JSX.Element {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user, setUser } = useContext<any>(UserContext)
  const [userAssets, setUserAssets] = useState<any>([])
  const { id } = useParams()
  const [idCurrent, setIdCurrent] = useState<string>(id)

  if (idCurrent !== id) {
    setIdCurrent(id)
    getUserAssets()
  }

  async function getUserAssets() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}users/${id}/assets`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
          credentials: 'include',
          body: JSON.stringify({ owner: id }),
        },
      )
      if (res.status == 200) {
        const userAssets = await res.json()
        setUserAssets(userAssets)
      }
    } catch (err) {
      console.log(err)
      // TODO errorHandling
    }
    setLoading(false)
  }

  useEffect(() => {
    setIdCurrent(id)
    getUserAssets()
  }, [])

  return (
    <div id='user-assets'>
      {!loading ? (
        userAssets?.length !== 0 ? (
          userAssets.map((item: any, index: number) => {
            if (id === user?.username) {
              return (
                <Asset
                  assetProps={item}
                  index={index}
                  user_kokans={user?.kokans}
                ></Asset>
              )
            } else {
              if (item.onOffer === true) {
                return (
                  <Asset
                    assetProps={item}
                    index={index}
                    user_kokans={user?.kokans}
                  ></Asset>
                )
              }
            }
          })
        ) : (
          <div className='asset'>
            <div style={{ marginLeft: '1rem' }}>
              <p>No assets yet.</p>
              <NavLink to={`/assets/new`} className='unstyledLink'>
                <p>Link your first GitHub asset.</p>
              </NavLink>
            </div>
          </div>
        )
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default UserAssets
