import { useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react'
import {
  NavLink,
  Outlet,
  useOutletContext,
  useNavigate,
} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import '../styles/3.2_Assets_New.css'

/* import components */
import SelectLicence from '../components/SelectLicense.tsx'
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
const tooltipsKokans = 'Choose your Kokan value from 1 to 5 Kokans.'
const tooltipLicense = `Pick a license for your asset.
This helps to ensure you and your swap partner know how they can use your asset.` // TD ideally, this tooltip contains a link to https://choosealicense.com/
const tooltipTags =
  'Add tags to your asset. They will help other users find your asset.'

/* licenseTypes */
const licenseTypes = [
  'Apache License 2.0',
  'Boost Software License 1.0',
  'BSD 2-clause "Simplified" License',
  'BSD 3-clause "New" or "Revised" License',
  'GNU Affero General Public License v3.0',
  'GNU General Public License v3.0',
  'GNU Lesser General Public License v3.0',
  'MIT',
  'Mozilla Public License 2.0',
  'Open Software License 3.0',
  'The Unlicense',
]

function AssetsNew(): JSX.Element {
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm()
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
  const [license, setLicense] = useState<string>('License')
  const [tags, setTags] = useState('')

  useEffect(() => {
    setPortalContainer(document.getElementById('new-asset-container'))
  }, [])

  async function handleFormSubmit(data: any) {
    const { title, description_short, description_long, kokans, license } = data
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
          licence: license,
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
    setKokans(Number(event.target.value))
  }

  function handleChangeLicense(event: string) {
    console.log(event)
    if (event !== '') setLicense(event)
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
        onSubmit={handleSubmit((data) => handleFormSubmit(data))}
        noValidate
      >
        <div className='text-input'   style={{ width: '75%' }}>
          <label htmlFor='title'>
            Title
            <TooltipInfo content={tooltipTitle} />
          </label>
          <input
            {...register('title', {
              required: true,
              minLength: 9,
              maxLength: 60,
            })}
            onChange={handleChangeText}
            name='title'
            className='new-asset'
            type='text'
            minLength={10}
            maxLength={60}
            placeholder='Title'
            style={{ width: '100%', padding: '0.9rem', fontSize: 'medium' }}
            value={title}
          />
          <div>
            {title && 10 - title.length > 0 && (
              <span className='validation-error'>
                {10 - title.length} more characters.{' '}
              </span>
            )}
            {errors.title && (
              <span className='validation-error'>Title invalid.</span>
            )}
          </div>
        </div>

        <div className='text-input' style={{ width: '75%' }}>
          <label htmlFor='descriptionShort'>
            Short Description
            <TooltipInfo content={tooltipShortDescription} />
          </label>
          <textarea
            {...register('descriptionShort', {
              required: true,
              minLength: 50,
              maxLength: 160,
            })}
            id='descriptionShort'
            name='descriptionShort'
            form='newAsset'
            onChange={handleChangeTextAreaShortDescription}
            className='text-area'
            minLength={50}
            maxLength={160}
            rows={3}
            style={{ width: '100%' }}
            placeholder='Provide a short description. It will be displayed in the assets overview.'
            value={shortDescription}
          />
          <div>
            {shortDescription && 50 - shortDescription.length > 0 && (
              <span className='validation-error'>
                {50 - shortDescription.length} more characters.{' '}
              </span>
            )}
            {errors.descriptionShort && (
              <p className='validation-error'>Short description invalid.</p>
            )}
          </div>
        </div>

        <div className='text-input' style={{ width: '75%' }}>
          <label htmlFor='descriptionLong'>
            Long Description
            <TooltipInfo content={tooltipLongDescription} />
          </label>
          <textarea
            {...register('descriptionLong', {
              required: true,
              minLength: 50,
              maxLength: 2000,
            })}
            id='descriptionLong'
            name='descriptionLong'
            form='newAsset'
            onChange={handleChangeTextAreaLongDescription}
            className='text-area'
            minLength={50}
            maxLength={2000}
            rows={8}
            style={{ width: '100%' }}
            placeholder={`Provide a long description. It will be displayed on your asset's page.`}
            value={longDescription}
          />
          <div>
            {longDescription && 50 - longDescription.length > 0 && (
              <span className='validation-error'>
                {50 - longDescription.length} more characters.{' '}
              </span>
            )}
            {errors.descriptionLong && (
              <p className='validation-error'>Long description invalid.</p>
            )}
          </div>
        </div>

        <div className='text-input'>
          <label htmlFor='kokans'>
            Kokans
            <TooltipInfo content={tooltipsKokans} />
          </label>
          <input
            {...register('kokans', {
              required: true,
              valueAsNumber: true,
              validate: (value) => value > 0 && value < 6,
            })}
            onChange={handleChangeKokans}
            name='kokans'
            className='new-asset'
            type='number'
            step='1'
            min='1'
            max='5'
            value={kokans}
          ></input>
          {errors.kokans && <p className='validation-error'>Kokans invalid.</p>}
        </div>

        <div className='text-input'>
          <label htmlFor='licence'>
            License
            <TooltipInfo content={tooltipLicense} />
          </label>
          <SelectLicence
            handleChangeLicence={handleChangeLicense}
            licenseTypes={licenseTypes}
            license={license}
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
            trigger={trigger}
          />
        </div>
      </form>
    </div>
  )
}

export default AssetsNew

/**
 * 
         onClick={async () => {
            const result = await trigger([
              'title',
              'descriptionLong',
              'descriptionShort',
              'kokans',
              'license',
            ])
          }}
 */
