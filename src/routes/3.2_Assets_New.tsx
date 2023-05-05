import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../styles/3.2_Assets_New.css'

/* import components */
import SelectLicence from '../components/SelectLicence.tsx'
import TooltipInfo from '../components/Tooltip.tsx'

import AlertDialogCreateNew from '../components/AlertDialogCreateNew.tsx'

import { mockAssets } from '../assets/mockAssets'

/* toolTips */
const tooltipTitle = 'Provide a title. Minimum 10, maximum 50 characters.';
const tooltipShortDescription = 'Provide a short description for your asset. Minimum 50, maximum 160 characters.';
const tooltipLongDescription = 'Provide a short description for your asset. Minimum 50, maximum 2000 characters.';
const tooltipsKokans = 'Choose your kokan value from 1 to 5 Kokans.';
const tooltipLicence = `Pick a license for your asset. This helps to ensure you and your swap partner know how they can use your asset.`; // ideally, this tooltip contains a link to https://choosealicense.com/
const tooltipTags = 'Add tags to your asset. They will help other users find your asset.';


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
    document.getElementById('new-asset-container'),
  )

  useEffect(() => {
    setPortalContainer(document.getElementById('new-asset-container'))
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {

    event.preventDefault()
    console.log(event.target['0'].value) // there is an object with numbers as keys that store the input
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

  function onSubmitTrigger() {
    console.log('triggered')
    const form: HTMLFormElement = document.forms.newAsset
    console.log(form)
    form.requestSubmit();
  }

  return (
    <div id='new-asset-container'>
      {' '}
      <h1>Upload New Asset</h1>
      <form name='newAsset' onSubmit={handleSubmit} noValidate>
        <div className='text-input'>
          <label htmlFor='title'>Title<TooltipInfo content={tooltipTitle}/></label>
          <input name='title' className='new-asset' type='text' minLength={10} maxLength={60} placeholder='Title'></input>
        </div>

        <div className='text-input'>
          <label htmlFor='short-description'>Short Description<TooltipInfo content={tooltipShortDescription}/></label>
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
          <label htmlFor='title'>Long Description<TooltipInfo content={tooltipLongDescription}/></label>
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
          <label htmlFor='kokans'>Kokans<TooltipInfo content={tooltipsKokans}/></label>
          <input name='kokans' className='new-asset' type='number' step='1' min='1' max='5' defaultValue={3}></input>
        </div>

        <div className='text-input'>
          <label htmlFor='licence'>Licence<TooltipInfo content={tooltipLicence}/></label>
          <SelectLicence />
        </div>

        <div className='text-input'>
          <label htmlFor='tags'>Tags<TooltipInfo content={tooltipTags}/></label>
          <input name='tags'></input>
        </div>
        <AlertDialogCreateNew
            portalContainer={portalContainer} onSubmitTrigger={onSubmitTrigger}
          />
        
      </form>
    </div>
  )
}

export default AssetsNew

{/* <input type='submit' value='UPLOAD'></input> */}