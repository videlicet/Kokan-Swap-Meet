import { useState, useEffect, useContext } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import date from 'date-and-time'
import remarkGfm from 'remark-gfm'

/* import styles */
import '../styles/4.1_Assets_Detail.css'

/* import components */
import AlertDialogAssetSwap from '../components/AlertDialogAssetSwap'
import AlertDialogAssetDelete from '../components/AlertDialogAssetDelete'
import AlertDialogAssetOffer from '../components/AlertDialogAssetOffer'
import Loading from '../components/Loading'
import ReactMarkdown from 'react-markdown'

/* import types */
import { AssetInterface } from '../types/types'

/* import context */
import { UserContext, PortalContext } from './1_App'

function AssetsDetail(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)
  const [asset, setAsset] = useState<AssetInterface>()
  const { user } = useContext<any>(UserContext)
  const { portalContainer } = useContext<any>(PortalContext)

  let { id } = useParams<string>()
  const navigate = useNavigate()

  useEffect(() => {
    getAsset(user?._id)
  }, [])

  async function getAsset(requester: string) {
    setLoading(true)
    /* get asset in database */
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}assets/${id}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({
            asset: { _id: id },
            requester: { _id: requester },
          }),
        },
      )
      if (res.status == 200) {
        const asset = await res.json()
        setAsset(asset)
        setLoading(false)
      }
    } catch (err) {
      // TODO ERROR HANDLING
      setLoading(false)
    }
  }

  async function onSwap() {
    setLoading(true)
    /* create transaction in database */
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}transactions`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({
          transaction: {
            asset_id: asset?._id,
            kokans: asset?.kokans,
            requester: user?._id,
            requestee: asset?.owners,
            created: new Date(),
            status: 'pending',
          },
        }),
      })
    } catch (err) {
      // TODO ERROR HANDLING
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
      await fetch(`${import.meta.env.VITE_SERVER_URL}users/${user?._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify(reqBody),
      })
    } catch (err) {
      // TODO ERROR HANDLING
    }

    /* send emails to owners */
    try {
      asset?.owners_usernames.map(async (owner: string) => {
        // TODO typing
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}emails/swap/submit`,
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify({
              user: { username: user?.username },
              owner: { username: owner },
              asset: { title: asset?.title },
            }),
          },
        )
        if (res.status === 200) {
          // TODO show sth that the email was sent
        }
      })
      setLoading(false)
    } catch (err) {
      // TODO ERROR HANDLING
      setLoading(false)
    }
    navigate(`/me/requests/outgoing`)
  }

  async function onDelete() {
    setLoading(true)
    /* delete asset */
    try {
      let res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}assets/${asset?._id}`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({ asset: { _id: asset?._id } }),
        },
      )
      if (res.status === 200) {
        /*delete swap requests relating to this asset*/
        await fetch(`${import.meta.env.VITE_SERVER_URL}transactions`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({ asset: { _id: asset?._id } }),
        })

        /* rebate pending to requesters */
        const changes = {
          $inc: {
            kokans: +asset?.kokans,
            kokans_pending: -asset?.kokans,
          },
        }
        const reqBody = {
          users: { _id: { $in: asset?.transaction_requesters } },
          update: { changes: changes },
        }
        try {
          await fetch(`${import.meta.env.VITE_SERVER_URL}users`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify(reqBody),
          })
        } catch (err) {
          // TODO ERROR HANDLING
          setLoading(false)
        }
      }
    } catch (err) {
      // TODO ERROR HANDLING
      setLoading(false)
    }
    navigate(`/me/assets`)
  }

  async function onOffer() {
    setLoading(true)
    try {
      let res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}assets/${asset?._id}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
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
        navigate(`/me/assets`)
        setLoading(false)
      }
    } catch (err) {
      navigate(`/me/assets`)
      setLoading(false)
    }
  }

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
                <div style={{ marginBottom: '1rem' }}>
                  <span className='kokans' style={pricey}>
                    {asset?.kokans}
                  </span>
                  <span className='title'>{asset?.title}</span>
                </div>
                <div>
                  <span>
                    Creator:{' '}
                    {(asset?.creator_username && (
                      <NavLink
                        className='link'
                        to={`/user/${asset?.creator_username}/assets`}
                      >
                        {asset?.creator_username}
                      </NavLink>
                    )) ||
                      'Deleted User'}
                  </span>
                  <span>
                    , {date.format(new Date(asset?.created), 'YYYY/MM/DD')}
                  </span>
                </div>
              </div>
              <div className='interaction'>
                {user &&
                  !asset?.owners_usernames.includes(user?.username) &&
                  !asset?.transaction_status && (
                    <AlertDialogAssetSwap
                      portalContainer={portalContainer}
                      price={asset?.kokans}
                      onSwap={onSwap}
                      disabled={user?.kokans < asset?.kokans ? true : false}
                    />
                  )}
                {user &&
                  !asset?.owners_usernames.includes(user?.username) &&
                  asset?.transaction_status === 'pending' && (
                    <span className='button-like inactive yellow'>
                      request pending since{' '}
                      {date.format(
                        new Date(asset?.transaction_created),
                        'YYYY/MM/DD',
                      )}
                    </span>
                  )}
                {user && asset?.owners_usernames.includes(user?.username) && (
                  <span className='button-like inactive green'>yours</span>
                )}
                {user && asset?.creator_username == user?.username && (
                  <AlertDialogAssetDelete
                    portalContainer={portalContainer}
                    title={asset?.title}
                    onDelete={onDelete}
                  />
                )}
                {user && asset?.owners.includes(user?._id) && (
                  <AlertDialogAssetOffer
                    portalContainer={portalContainer}
                    title={asset?.title}
                    onOffer={onOffer}
                    removeable={asset?.onOffer ? true : false}
                  />
                )}
              </div>
            </div>
            <br />
            <div className='description long'>
              <ReactMarkdown
                children={asset?.description_long}
                remarkPlugins={[remarkGfm]}
              />
            </div>

            <div
              className='asset-footer'
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {user &&
                asset?.creator_username &&
                asset?.owners.includes(user?._id) && (
                  <div className='additional-info'>
                    <span className='info-type'>Repository</span>
                    <span className='info'>
                      <a
                        href={`https://github.com/${asset?.creator_username}/${asset?.gitHub_repo}`}
                        target='_blank'
                      >
                        {asset?.gitHub_repo}
                      </a>
                    </span>
                  </div>
                )}
              <div className='additional-info'>
                <span className='info-type'>License</span>
                <span className='info'>{asset?.licence}</span>
              </div>
              <div className='additional-info'>
                <span className='info-type'>Tags</span>
                {asset?.tags.map((tag: string, index: number) => (
                  <span className='info' key={index}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className='additional-info'>
                <span className='info-type'>Owners</span>
                <div style={{ display: 'flex' }}>
                  {(asset?.owners_usernames.length > 0 &&
                    asset?.owners_usernames.map(
                      (owner: string, index: number) => (
                        <NavLink
                          key={index}
                          className='info'
                          to={`/user/${owner}/assets`}
                        >
                          <span>{owner}</span>
                        </NavLink>
                      ),
                    )) || <span className='info'>deleted user</span>}
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
