import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../styles/3.2_Assets_New.css'

/* import components */
import SelectLicence from '../components/SelectLicence.tsx'

import AlertDialogSwap from '../components/AlertDialogSwap.tsx'

import { mockAssets } from '../assets/mockAssets'

function AssetsNew(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [shortDescription, setShortDescription] = useState('')
  const [longDescription, setLongDescription] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [asset, setAsset] = useState(mockAssets[0])
  const [openSwap, setOpenSwap] = useState(false)
  const [portalContainer, setPortalContainer] = useState(
    document.getElementById('asset-container'),
  )

  useEffect(() => {
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

  function handleChangeTextAreaShortDescription(
    event: ChangeEvent<HTMLTextAreaElement>,
  ) {
    setShortDescription(event.target.value)
  }

  function handleChangeTextAreaLongDescription(
    event: ChangeEvent<HTMLTextAreaElement>,
  ) {
    setLongDescription(event.target.value)
  }

  function onSwap(event: any) {
    console.log(event)
  }

  return (
    <div id='new-asset-container'>
      {' '}
      {/*change to new asset container*/}
      <h1>Upload New Asset</h1>
      <form onSubmit={handleSubmit}>
        <div className='text-input'>
          <label htmlFor='title'>Title</label>
          <input name='title' className='new-asset' type='text'></input>
        </div>

        <div className='text-input'>
          <label htmlFor='short-description'>Short Description</label>
          <textarea
            id='short-description'
            name='short-description'
            onChange={handleChangeTextAreaShortDescription}
            className='text-area'
            minLength={50}
            maxLength={160}
            rows={2}
            cols={50}
            placeholder='Provide a short description. It will displayed in the assets overview.'
          />
        </div>

        <div className='text-input'>
          <label htmlFor='title'>Long Description</label>
          <textarea
            id='long-description'
            name='long-description'
            onChange={handleChangeTextAreaLongDescription}
            className='text-area'
            minLength={50}
            maxLength={2000}
            rows={8}
            cols={50}
            placeholder='Provide a long description. It will displayed in the assets page.'
          />
        </div>

        <div className='text-input'>
          <label htmlFor='kokans'>Kokans</label>
          <input name='kokans' className='new-asset' type='number' step='1' min='1' max='5' defaultValue={3}></input>
        </div>

        <div className='text-input'>
          <label htmlFor='licence'>Licence</label>
          <SelectLicence />
        </div>

        <div className='text-input'>
          <label htmlFor='tags'>Tags</label>
          <input name='tags'></input>
        </div>

        <input type='submit' value='UPLOAD'></input>
      </form>
    </div>
  )
}

export default AssetsNew