import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from 'react'
import {
  NavLink,
  useNavigate,
  useParams,
  useOutletContext,
} from 'react-router-dom'
import serverURL from '../../server_URL.ts'
import '../styles/3.1_Assets_Detail.css'

/* import components */

import AlertDialogAssetSwap from '../components/AlertDialogAssetSwap.tsx'
import AlertDialogAssetDelete from '../components/AlertDialogAssetDelete.tsx'

import { AssetInterface } from '../assets/mockAssets'

function AssetsDetail(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [asset, setAsset] = useState<AssetInterface>()
  const [user, setUser] = useOutletContext() as any[]
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

        /* get username from creator id */
        const user = await fetch(`${serverURL}users/${asset.creator}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user: { _id: asset.creator } }),
        })
        const { username } = await user.json()
        asset.creator = username

        /* get usernames from owner ids */
        asset.owners = await Promise.all(
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
            requestee: asset?.broker,
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
        navigate(`/user/${user.username}/assets`)
      }
    } catch (err) {
      // TD errorhandling
    }
  }

  return (
    <div id='asset-container'>
      {asset && (
        <>
          <div className='header'>
            <div>
              <span className='title'>{asset.title}</span>
              <span>
                &nbsp;&nbsp;by&nbsp;
                <NavLink to='/user/1'>&nbsp;{asset.creator}</NavLink>
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
          <span>
            {/*Tags:{' '}*/}
            {asset.type.map((item) => (
              <span className='tag'>{item}</span>
            ))}
          </span>
          <br />
          <br />
          <div className='description'>
            <span>Swap for&nbsp;&nbsp;</span>
            <span className='kokans'>{asset.kokans}</span>
            {user &&  !asset.owners.includes(user.username)  && (
              <AlertDialogAssetSwap
                portalContainer={portalContainer}
                price={asset?.kokans}
                onSwap={onSwap}
              />
            )}
            {user && asset.broker == user._id && (
              <AlertDialogAssetDelete
                portalContainer={portalContainer}
                title={asset?.title}
                onDelete={onDelete}
              />
            )}
          </div>
          <span>
            Owned by:{' '}
            {asset.owners.map((item: string) => (
              <span className='tag'>{item}</span>
            ))}
          </span>
        </>
      )}
    </div>
  )
}

export default AssetsDetail
