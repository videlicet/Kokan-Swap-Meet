// @ts-nocheck
import { useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react'
import {
  NavLink,
  Outlet,
  useOutletContext,
  useNavigate,
} from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import '../styles/3.2_Assets_New.css'

/* import components */
import SelectLicence from '../components/SelectLicense.tsx'
import TooltipInfo from '../components/Tooltip.tsx'

import AlertDialogCreateNew from '../components/AlertDialogCreateNew.tsx'

/* context */
import { PortalContext, UserContext } from './1_App'

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
const tooltipsRepo = 'Provide the name of the GitHub repository you want to link to your Kokan account.'


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
    watch,
    control,
    formState: { errors },
  } = useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user, setUser } = useContext<any>(UserContext)
  const { portalContainer } = useContext<any>(PortalContext)
  const navigate = useNavigate()

  async function handleFormSubmit(data: any) {
    const { repo, title, descriptionShort, descriptionLong, kokans, license } = data
    console.log(data)
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}assets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          gitHub_repo: repo,
          title: title,
          kokans: kokans,
          description_short: descriptionShort,
          description_long: descriptionLong,
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
    const form: HTMLFormElement = document.forms.newAsset // TD type
    form.requestSubmit()
  }

  return (
    <div id='new-asset-container'>
      <h2>Link New Asset</h2>
      <form
        className='new-asset-form'
        name='newAsset'
        onSubmit={handleSubmit((data) => handleFormSubmit(data))}
        noValidate
      >
        <div className='text-input' style={{ width: '75%' }}>
          <label htmlFor='repo'>
            GitHub Repository
            <TooltipInfo content={tooltipsRepo} />
          </label>
          <input
            {...register('repo', {
              required: true,
              minLength: 1,
              maxLength: 100,
            })}
            name='repo'
            className='new-asset'
            type='text'
            placeholder='GitHub Repository'
            style={{ width: '100%', padding: '0.9rem', fontSize: 'medium' }}
          />
          <div>
            {errors.title && (
              <span className='validation-error'>GitHub Repository name invalid.</span>
            )}
          </div>
        </div>

        <div className='text-input' style={{ width: '75%' }}>
          <label htmlFor='title'>
            Asset Title
            <TooltipInfo content={tooltipTitle} />
          </label>
          <input
            {...register('title', {
              required: true,
              minLength: 9,
              maxLength: 60,
            })}
            name='title'
            className='new-asset'
            type='text'
            placeholder='Title'
            style={{ width: '100%', padding: '0.9rem', fontSize: 'medium' }}
          />
          <div>
            {watch('title') && 10 - watch('title').length > 0 && (
              <span className='validation-error'>
                {10 - watch('title').length} more characters.{' '}
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
            className='text-area'
            rows={3}
            style={{ width: '100%' }}
            placeholder='Provide a short description. It will be displayed in the assets overview.'
          />
          <div>
            {watch('descriptionShort') &&
              50 - watch('descriptionShort').length > 0 && (
                <span className='validation-error'>
                  {50 - watch('descriptionShort').length} more characters.{' '}
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
            className='text-area'
            rows={8}
            style={{ width: '100%' }}
            placeholder={`Provide a long description. It will be displayed on your asset's page.`}
          />
          <div>
            {watch('descriptionLong') &&
              50 - watch('descriptionLong').length > 0 && (
                <span className='validation-error'>
                  {50 - watch('descriptionLong').length} more characters.{' '}
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
            name='kokans'
            className='new-asset'
            type='number'
            step='1'
            defaultValue={3}
          ></input>
          {errors.kokans && <p className='validation-error'>Kokans invalid.</p>}
        </div>

        <div className='text-input'>
          <label htmlFor='license'>
            License
            <TooltipInfo content={tooltipLicense} />
          </label>

          <Controller
            name='license'
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, ref, ...props } }) => (
              <SelectLicence
                onValueChange={onChange}
                value={value}
                forwardedRef={ref}
                licenseTypes={licenseTypes}
                license={watch('license')}
              />
            )}
          />
          {errors.license && (
            <p className='validation-error'>License invalid.</p>
          )}
        </div>

        <div className='text-input'>
          <AlertDialogCreateNew
            portalContainer={portalContainer}
            onSubmitTrigger={onSubmitTrigger}
            title={watch('title')}
            kokans={watch('kokans')}
            trigger={trigger}
          />
        </div>
      </form>
    </div>
  )
}

export default AssetsNew
