import { useState, useEffect, useContext } from 'react'
import {
  NavLink,
  useNavigate,
  useParams,
  useOutletContext,
} from 'react-router-dom'
import '../styles/3.1_Assets_Detail.css'

/* import components */
import AlertDialogAssetSwap from '../components/AlertDialogAssetSwap.tsx'
import AlertDialogAssetDelete from '../components/AlertDialogAssetDelete.tsx'
import AlertDialogAssetOffer from '../components/AlertDialogAssetOffer.tsx'

/* import types */
import { AssetInterface } from '../assets/mockAssets'

/* context */
import { UserContext } from './1_App'

import serverURL from '../../server_URL.ts'

function AssetsDetail(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [asset, setAsset] = useState<AssetInterface>()
  const { user, setUser } = useContext<any>(UserContext)
  const [openSwap, setOpenSwap] = useState(false)

  let { id } = useParams()
  const navigate = useNavigate()

  const [portalContainer, setPortalContainer] = useState(
    document.getElementById('asset-container'),
  )

  async function getData() {
    try {
      const res = await fetch(`${serverURL}assets/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ asset: { _id: id } }),
      })
      if (res.status == 200) {
        const asset = await res.json()


        asset.aliases = {creator: '', owners: []}
        /* get username aliases from creator id */
        
        const creator = await fetch(`${serverURL}users/${asset.creator}`, {
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
            const user = await fetch(`${serverURL}users/${owner}`, {
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
    getData()
    setPortalContainer(document.getElementById('asset-container'))
  }, [])

  async function onSwap() {
    try {
      let res = await fetch(`${serverURL}transactions`, {
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
      let res = await fetch(`${serverURL}assets/${asset?._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ asset: { _id: asset?._id } }),
      })
      if (res.status === 200) {
        /*delete swap requests relating to this asset*/
        const res = await fetch(`${serverURL}transactions`, {
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
      console.log('triggered')
      let res = await fetch(`${serverURL}assets/${asset?._id}`, {
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

  return (
    <div id='asset-container'>
      {asset && (
        <div>
          <div className='header'>
            <div>
              <span className='title'>{asset.title}</span>
              <span>
                &nbsp;&nbsp;by&nbsp;
                {(asset.aliases.creator !== 'Deleted User' && (
                  <NavLink to={`/user/${asset.aliases.creator}`}>
                    {asset.aliases.creator}
                  </NavLink>
                )) ||
                  asset.aliases.creator}
              </span>
            </div>
            <span className='licence'>{asset.licence}</span>
          </div>
          <br />
          <div className='description'>
            <span>{asset.description_long}</span>
          </div>
          <br />
          <span>Created: {asset.created}</span>
          <br />
          <br />
          <div>
            {/*Tags:{' '}*/}
            {asset.type.map((item) => (
              <span className='tag'>{item}</span>
            ))}
          </div>
          <br />
          <br />
          <div className='description'>
            <span>Swap for&nbsp;&nbsp;</span>
            <span className='kokans'>{asset.kokans}</span>
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
          <span>Owned by:</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: '0.3rem' }}>
            {asset.aliases?.owners.map((item: string) => (
              <span className='tag'>{item}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AssetsDetail
