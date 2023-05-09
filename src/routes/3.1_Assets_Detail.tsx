import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import axios from 'axios'
import serverURL from '../../server_URL.ts'
import '../styles/3.1_Assets_Detail.css'

/* import components */

import AlertDialogSwap from '../components/AlertDialogSwap.tsx'

import { mockAssets } from '../assets/mockAssets'

function AssetsDetail(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [asset, setAsset] = useState(mockAssets[0])
  const [openSwap, setOpenSwap] = useState(false)
  let { id } = useParams();
  const [portalContainer, setPortalContainer] = useState(
    document.getElementById('asset-container'),
  )

  async function getData () {
    try {
      const { data } = await axios.get(`${serverURL}assets/${id}`);
      setAsset(data[0])
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
    setPortalContainer(document.getElementById('asset-container'))
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    /*axios.post(
                "https://api.imgflip.com/caption_image",
                {
                    form: {
                        template_id: '181913649',
                        username: 'USERNAME',
                        password: 'PASSWORD',
                        text0: 'text0',
                        text1: 'text1',
                    },
                }
            )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });*/
    setUsername('')
    setPassword('')
  }

  function handleChangeUsername(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
  }

  function handleChangePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function onSwap(event: any) {
    console.log(event)
  }
  
  return (
    <div>
      <div id="asset-container">
        <div className="header">
          <div>
            <span className="title">{asset.name}</span>
            <span>
              &nbsp;&nbsp;by&nbsp;
              <NavLink to="/user/1">&nbsp;{asset.creator}</NavLink>
            </span>
          </div>
          <span className="licence">{asset.licence}</span>
        </div>
        <br />
        <div className="description">
          <span>{asset.description_long}</span>
        </div>
        <br />
        <span>Created: {asset.created}</span>
        <br />
        <br />
        <span>
          Tags:{' '}
          {asset.type.map((item) => (
            <span className="tag">{item}</span>
          ))}
        </span>
        <br />
        <br />
        <div className="description">
          <span>Swap for&nbsp;&nbsp;</span>
          <span className="kokans">{asset.kokans}</span>
          <AlertDialogSwap
            portalContainer={portalContainer}
            price={asset.kokans}
            onSwap={onSwap}
          />
        </div>
        <span>
          Owned by:{' '}
          {asset.owners.map((item) => (
            <span className="tag">{item}</span>
          ))}
        </span>
      </div>
    </div>
  )
}

export default AssetsDetail