import { useState, useEffect, useContext } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import '../styles/3.1_Assets_Detail.css'

/* import components */
import AlertDialogAssetSwap from '../components/AlertDialogAssetSwap.tsx'
import AlertDialogAssetDelete from '../components/AlertDialogAssetDelete.tsx'
import AlertDialogAssetOffer from '../components/AlertDialogAssetOffer.tsx'
import Loading from '../components/Loading'

/* import types */
import { AssetInterface } from '../assets/mockAssets'

/* context */
import { UserContext, PortalContext } from './1_App'

function AssetsDetail(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState(null)
  const [asset, setAsset] = useState<AssetInterface>()
  const { user, setUser } = useContext<any>(UserContext)
  const { portalContainer } = useContext<any>(PortalContext)

  let { id } = useParams<string>()
  const navigate = useNavigate()

  async function getAsset() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}assets/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ asset: { _id: id } }),
        },
      )
      if (res.status == 200) {
        const asset = await res.json()
        setAsset(asset)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAsset()
  }, [])

  async function onSwap() {
    /* create transaction in database */
    try {
      let res = await fetch(`${import.meta.env.VITE_SERVER_URL}transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transaction: {
            asset_id: asset?._id,
            kokans: asset?.kokans,
            requester: user._id,
            requestee: asset?.owners,
            created: new Date(),
            status: 'pending',
          },
        }),
      })
      if (res.status === 201) {
        navigate(`/user/${user?.username}/requests/outgoing`)
      }
    } catch (err) {
      // TD errorhandling
    }
    /* change total kokans and pending kokans */
    const changes = {
      $inc: {
        kokans: -asset?.kokans,
        kokans_pending: asset?.kokans,
      },
    }
    const reqBody = {
      user: { _id: user?._id },
      update: { changes: changes },
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}users/${user?._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(reqBody),
        },
      )
    } catch (err) {
      // TD errorHandling
      console.log(err)
    }
  }

  async function onDelete() {
    try {
      let res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}assets/${asset?._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ asset: { _id: asset?._id } }),
        },
      )
      if (res.status === 200) {
        /*delete swap requests relating to this asset*/
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}transactions`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ asset: { _id: asset?._id } }),
          },
        )

        navigate(`/user/${user?.username}/assets`)
      }
    } catch (err) {
      // TD errorhandling
    }
  }

  async function onOffer() {
    try {
      let res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}assets/${asset?._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            asset: {
              asset_id: asset?._id,
            },
            update: { onOffer: !asset?.onOffer },
          }),
        },
      )
      if (res.status === 200) {
        navigate(`/user/${user?.username}/assets`)
      }
    } catch (err) {
      // TD errorhandling
    }
  }

  const assetCreated = [
    asset?.created.slice(0, 4),
    asset?.created.slice(5, 7),
    asset?.created.slice(8, 10),
  ].join('/')

  const pricey =
    user?.kokans < asset?.kokans
      ? {
          backgroundColor: 'grey',
        }
      : undefined

  return (
    <div id='asset-container'>
      {!loading ? (
        asset && (
          <div>
            <div className='header'>
              <div>
                <span className='title'>{asset.title}</span>
                <span className='kokans' style={pricey}>
                  {asset.kokans}
                </span>
                <span>
                  &nbsp;&nbsp;by&nbsp;
                  {(asset.creator_username !== 'Deleted User' && (
                    <NavLink to={`/user/${asset.creator_username}`}>
                      {asset.creator_username}
                    </NavLink>
                  )) ||
                    asset.creator_username}
                </span>
                <div style={{ color: 'grey' }}> {assetCreated}</div>
              </div>
              <div className='interaction'>
                {user && !asset.owners_usernames.includes(user.username) && (
                  <AlertDialogAssetSwap
                    portalContainer={portalContainer}
                    price={asset.kokans}
                    onSwap={onSwap}
                    disabled={user.kokans < asset.kokans ? true : false}
                  />
                )}
                {user && asset.creator_username == user.username && (
                  <AlertDialogAssetDelete
                    portalContainer={portalContainer}
                    title={asset.title}
                    onDelete={onDelete}
                  />
                )}
                {user && asset.owners.includes(user._id) && (
                  <AlertDialogAssetOffer
                    portalContainer={portalContainer}
                    title={asset.title}
                    onOffer={onOffer}
                    removeable={asset.onOffer ? true : false}
                  />
                )}
              </div>
            </div>
            <br />
            <div className='description'>
              <span>{asset.description_long}</span>
            </div>

            <div
              className='asset-footer'
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div className='additional-info'>
                <span className='info-type'>License</span>
                <span className='info'>{asset.licence}</span>
              </div>
              <div className='additional-info'>
                <span className='info-type'>Type</span>
                {asset.type.map((item) => (
                  <span className='info'>{item}</span>
                ))}
              </div>

              <div className='additional-info'>
                <span className='info-type'>Owners</span>
                <div style={{ display: 'flex' }}>
                  {asset.owners_usernames.map((item: string) => (
                    <span className='info'>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default AssetsDetail
