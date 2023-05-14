import { useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react'
import {
  NavLink,
  Outlet,
  useOutletContext,
  useNavigate,
} from 'react-router-dom'
import '../styles/3.2_Assets_New.css'

/* import components */
import SelectLicence from '../components/SelectLicence.tsx'
import TooltipInfo from '../components/Tooltip.tsx'

import AlertDialogCreateNew from '../components/AlertDialogCreateNew.tsx'

/* context */
import { UserContext } from './1_App'

import serverURL from '../../server_URL'

/* toolTips */
const tooltipTitle = 'Provide a title. Minimum 10, maximum 50 characters.'
const tooltipShortDescription =
  'Provide a short description for your asset. Minimum 50, maximum 160 characters.'
const tooltipLongDescription =
  'Provide a short description for your asset. Minimum 50, maximum 2000 characters.'
const tooltipsKokans = 'Choose your kokan value from 1 to 5 Kokans.'
const tooltipLicence = `Pick a license for your asset. This helps to ensure you and your swap partner know how they can use your asset.` // ideally, this tooltip contains a link to https://choosealicense.com/
const tooltipTags =
  'Add tags to your asset. They will help other users find your asset.'

function AssetsNew(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  //const [user, setUser] = useOutletContext() as any[]
  const { user, setUser } = useContext<any>(UserContext)
  const navigate = useNavigate()

  /* alertDialog */
  const [portalContainer, setPortalContainer] = useState(
    document.getElementById('new-asset-container'),
  )

  /* new asset */
  const [shortDescription, setShortDescription] = useState<string>('')
  const [longDescription, setLongDescription] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [kokans, setKokans] = useState<number>(3)
  const [licence, setLicence] = useState<string>('Licence')
  const [tags, setTags] = useState('')

  useEffect(() => {
    setPortalContainer(document.getElementById('new-asset-container'))
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const { elements } = event.target as HTMLFormElement
    const { value: title } = elements[0] as HTMLInputElement
    const { value: description_short } = elements[1] as HTMLInputElement
    const { value: description_long } = elements[2] as HTMLInputElement
    const { value: kokans } = elements[3] as HTMLInputElement
    const { value: tags } = elements[4] as HTMLInputElement // tags input field; here element 4 even though last element in view
    const { value: licence } = elements[5] as HTMLInputElement
    try {
      await fetch(`${serverURL}assets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: title,
          kokans: kokans,
          description_short: description_short,
          description_long: description_long,
          //tag: tags,
          licence: licence,
          creator: user._id,
          owners: [user._id],
          onOffer: false,
          type: ['code'], // TD change when different types allowed
          created: new Date(),
        }),
      })
    } catch (error) {
      // TD errorHandling
    }
    navigate(`/user/${user.username}/assets`)
  }

  /* triggers submit of form after confirmation in alert dialog */
  function onSubmitTrigger() {
    const form: HTMLFormElement = document.forms.newAsset
    form.requestSubmit()
  }

  function handleChangeText(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
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

  function handleChangeKokans(event: ChangeEvent<HTMLInputElement>) {
    setKokans(event.target.value)
  }

  function handleChangeLicence(event: string) {
    setLicence(event)
  }

  function handleChangeTags(event: ChangeEvent<HTMLInputElement>) {
    setTags(event.target.value)
  }

  return (
    <div id='new-asset-container'>
      <h1>Upload New Asset</h1>
      <form
        className='new-asset-form'
        name='newAsset'
        onSubmit={handleSubmit}
        noValidate
      >
        <div className='text-input'>
          <label htmlFor='title'>
            Title
            <TooltipInfo content={tooltipTitle} />
          </label>
          <input
            onChange={handleChangeText}
            name='title'
            className='new-asset'
            type='text'
            minLength={10}
            maxLength={60}
            placeholder='Title'
            style={{ width: '30rem', padding: '0.9rem', fontSize: 'medium' }}
            value={title}
          ></input>
        </div>

        <div className='text-input'  style={{ width: '75%' }}>
          <label htmlFor='short-description'>
            Short Description
            <TooltipInfo content={tooltipShortDescription} />
          </label>
          <textarea
            id='short-description'
            name='short-description'
            onChange={handleChangeTextAreaShortDescription}
            className='text-area'
            minLength={50}
            maxLength={160}
            rows={2}
            style={{ width: '100%' }}
            placeholder='Provide a short description. It will be displayed in the assets overview.'
            value={shortDescription}
          />
        </div>

        <div className='text-input' style={{ width: '75%' }}>
          <label htmlFor='long-description'>
            Long Description
            <TooltipInfo content={tooltipLongDescription} />
          </label>
          <textarea
            id='long-description'
            name='long-description'
            onChange={handleChangeTextAreaLongDescription}
            className='text-area'
            minLength={50}
            maxLength={2000}
            rows={8}
            style={{ width: '100%' }}
            placeholder={`Provide a long description. It will be displayed on your asset's page.`}
            value={longDescription}
          />
        </div>

        <div className='text-input'>
          <label htmlFor='kokans'>
            Kokans
            <TooltipInfo content={tooltipsKokans} />
          </label>
          <input
            onChange={handleChangeKokans}
            name='kokans'
            className='new-asset'
            type='number'
            step='1'
            min='1'
            max='5'
            value={kokans}
          ></input>
        </div>

        <div className='text-input'>
          <label htmlFor='licence'>
            Licence
            <TooltipInfo content={tooltipLicence} />
          </label>
          <SelectLicence
            handleChangeLicence={handleChangeLicence}
            licence={licence}
          />
        </div>

        {!true && (
          <div className='text-input'>
            <label htmlFor='tags'>
              Tags
              <TooltipInfo content={tooltipTags} />
            </label>
            <input onChange={handleChangeTags} name='tags'></input>
          </div>
        )}

        <div className='text-input'>
          <AlertDialogCreateNew
            portalContainer={portalContainer}
            onSubmitTrigger={onSubmitTrigger}
            title={title}
            kokans={kokans}
          />
        </div>
      </form>
    </div>
  )
}

export default AssetsNew
