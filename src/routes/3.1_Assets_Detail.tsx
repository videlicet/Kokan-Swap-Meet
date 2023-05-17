import { useState, useEffect, useContext, useRef } from 'react'
import {
  NavLink,
  useNavigate,
  useParams,
} from 'react-router-dom'
import * as Separator from '@radix-ui/react-separator'
import '../styles/3.1_Assets_Detail.css'

/* import components */
import AlertDialogAssetSwap from '../components/AlertDialogAssetSwap.tsx'
import AlertDialogAssetDelete from '../components/AlertDialogAssetDelete.tsx'
import AlertDialogAssetOffer from '../components/AlertDialogAssetOffer.tsx'

/* import types */
import { AssetInterface} from '../assets/mockAssets'

/* context */
import { UserContext, PortalContext } from './1_App'

function AssetsDetail(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [asset, setAsset] = useState<AssetInterface>()
  const { user, setUser } = useContext<any>(UserContext)
  const {portalContainer} = useContext<any>(PortalContext)
  const [openSwap, setOpenSwap] = useState(false)

  let { id } = useParams()
  const navigate = useNavigate()
  
  async function getAsset() {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}assets/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ asset: { _id: id } }),
      })
      if (res.status == 200) {
        const asset = await res.json()

        asset.aliases = { creator: '', owners: [] }

        /* get username aliases from creator id */
        const creator = await fetch(`${import.meta.env.VITE_SERVER_URL}users/${asset.creator}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user: { _id: asset.creator } }),
        })
        if (creator.status === 200) {
          const { username } = await creator.json()
          asset.aliases.creator = username
        } else if (creator.status === 404) {
          asset.aliases.creator = 'Deleted User'
        }

        /* get usernames aliases from owner ids */
        const aliasesOwners = await Promise.all(
          asset.owners.map(async (owner: string) => {
            const user = await fetch(`${import.meta.env.VITE_SERVER_URL}users/${owner}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user: { _id: owner } }),
            })
            const { username } = await user.json()
            return username
          }),
        )
        asset.aliases.owners = aliasesOwners

        setAsset(asset)
      }
    } catch (error) {}
  }

  useEffect(() => {
    getAsset()
  }, [])

  async function onSwap() {
    try {
      let res = await fetch(`${import.meta.env.VITE_SERVER_URL}transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transaction: {
            asset_id: asset?._id,
            requester: user._id,
            requestee: asset?.owners,
            created: new Date(),
            status: 'pending',
          },
        }),
      })
      if (res.status === 201) {
        navigate(`/user/${user.username}/assets`)
      }
    } catch (err) {
      // TD errorhandling
    }
  }

  async function onDelete() {
    try {
      let res = await fetch(`${import.meta.env.VITE_SERVER_URL}assets/${asset?._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ asset: { _id: asset?._id } }),
      })
      if (res.status === 200) {
        /*delete swap requests relating to this asset*/
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}transactions`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ asset: { _id: asset?._id } }),
        })

        navigate(`/user/${user.username}/assets`)
      }
    } catch (err) {
      // TD errorhandling
    }
  }

  async function onOffer() {
    try {
      let res = await fetch(`${import.meta.env.VITE_SERVER_URL}assets/${asset?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          asset: {
            asset_id: asset?._id,
          },
          update: { onOffer: true },
        }),
      })
      if (res.status === 200) {
        navigate(`/assets/${asset?._id}`)
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

  return (
    <div id='asset-container'>
      {asset && (
        <div>
          <div className='header'>
            <div>
              <span className='title'>{asset.title}</span>
              <span className='kokans'>{asset.kokans}</span>
              <span>
                &nbsp;&nbsp;by&nbsp;
                {(asset.aliases.creator !== 'Deleted User' && (
                  <NavLink to={`/user/${asset.aliases.creator}`}>
                    {asset.aliases.creator}
                  </NavLink>
                )) ||
                  asset.aliases.creator}
              </span>
              <div style={{ color: 'grey' }}> {assetCreated}</div>
            </div>
            <span className='licence'>{asset.licence}</span>
          </div>
          <br />
          <div className='description'>
            <span>{asset.description_long}</span>
          </div>
          <div>
            {user && !asset.aliases?.owners.includes(user.username) && (
              <AlertDialogAssetSwap
                portalContainer={portalContainer}
                price={asset?.kokans}
                onSwap={onSwap}
              />
            )}
            {user && asset.aliases.creator == user.username && (
              <AlertDialogAssetDelete
                portalContainer={portalContainer}
                title={asset?.title}
                onDelete={onDelete}
              />
            )}
            {user && !asset.onOffer && (
              <AlertDialogAssetOffer
                portalContainer={portalContainer}
                title={asset?.title}
                onOffer={onOffer}
              />
            )}
          </div>
          <Separator.Root className='SeparatorRoot' />
          <div
            className='asset-footer'
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div className='additional-info'>
              <span className='info-type'>Tags:</span>
              {asset.type.map((item) => (
                <span className='info'>{item}</span>
              ))}
            </div>

            <div className='additional-info'>
              <span className='info-type'>Owners:</span>
              {asset.aliases?.owners.map((item: string) => (
                <span className='info'>{item}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AssetsDetail
