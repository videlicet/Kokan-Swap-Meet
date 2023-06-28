import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'

/* import styles */
import '../styles/4.2_Assets_New.css'

/* import components */
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons'
import SelectLicence from '../components/SelectLicense.tsx'
import TooltipInfo from '../components/Tooltip.tsx'
import SliderKokan from '../components/SliderKokan.tsx'
import AlertDialogCreateNew from '../components/AlertDialogCreateNew.tsx'

/* import context */
import { PortalContext, UserContext } from './1_App.tsx'
import TypePicker from '../components/TypePicker.tsx'

/* toolTips */
const tooltipsRepo = (
  <div>
    <p>
      Provide the name of the GitHub repository you want to link to your Kokan
      account.
    </p>
    <p>
      You will need to check if that repo exists before uploading your asset.
    </p>
  </div>
)
const tooltipTags = 'Give your asset up to five tags.'
const tooltipTitle = 'Provide a title. Minimum 10, maximum 50 characters.'
const tooltipShortDescription =
  'Provide a short description for your asset. Minimum 50, maximum 160 characters.'
const tooltipLongDescription =
  'Provide a short description for your asset. Minimum 50, maximum 2000 characters.'
const tooltipsKokans = 'Choose your Kokan value from 1 to 5 Kokans.'
const tooltipLicense = (
  <div>
    <p>
      Pick a license for your asset. This helps to ensure you and your potential
      swap partners know how this asset can be used.
    </p>
    <p>
      Learn more about Open Source licenses{' '}
      <a
        href='https://choosealicense.com/'
        target='_blank'
        style={{ color: 'black', textDecoration: 'underline' }}
      >
        here
      </a>
      .
    </p>
  </div>
)

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
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      repo: undefined,
      tags: undefined,
      title: undefined,
      kokans: 3,
      license: undefined,
      descriptionShort: undefined,
      descriptionLong: undefined,
    },
  })
  const [kokans, setKokans] = useState<number>(3)
  const { user, setUser } = useContext<any>(UserContext)
  const { portalContainer } = useContext<any>(PortalContext)
  const [repoConfirmed, setRepoConfirmed] = useState<string>('pending')
  const navigate = useNavigate()

  useEffect(() => {
    setRepoConfirmed('pending')
  }, [watch('repo')])

  async function handleFormSubmit(data: any) {
    const {
      repo,
      tags,
      title,
      descriptionShort,
      descriptionLong,
      kokans,
      license,
    } = data
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}assets`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({
          gitHub_repo: repo,
          tags: tags,
          title: title,
          kokans: kokans,
          description_short: descriptionShort,
          description_long: descriptionLong,
          licence: license,
          creator: user._id,
          owners: [user._id],
          onOffer: false,
          created: new Date(),
        }),
      })
    } catch (err) {
      // TODO ERROR HANDLING
    }
    navigate(`/me/assets`)
  }

  /* triggers submit of form after confirmation in alert dialog */
  function onSubmitTrigger() {
    const form = (document.forms as HTMLCollectionOf<HTMLFormElement> & any)
      .newAsset // TODO type
    form.requestSubmit()
  }

  /* helper because kokan change helper (SliderKokan component can't use react hook forms) */
  function handleKokans(value: number[]) {
    setKokans(value[0])
    setValue('kokans', value[0])
  }

  /* check existence of repository */
  async function checkRepository() {
    try {
      let res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}auth/gitHub/repository`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({
            owner: user?.username,
            repository: watch('repo'),
          }),
        },
      )
      if (res.status === 200) {
        setRepoConfirmed('confirmed')
      } else {
        setRepoConfirmed('rejected')
      }
    } catch (err) {
      // TODO ERROR HANDLING
    }
  }

  return (
    <div id='new-asset-container'>
      <h2>Upload New Asset</h2>
      <form
        className='new-asset-form'
        name='newAsset'
        onSubmit={handleSubmit((data) => handleFormSubmit(data))}
        noValidate
      >
        <div className='text-input' style={{ width: '90%' }}>
          <label htmlFor='repo'>
            GitHub Repository
            <TooltipInfo content={tooltipsRepo} />
          </label>
          <div style={{ display: 'flex', width: '100%', gap: '1rem' }}>
            <input
              {...register('repo', {
                required: {
                  value: true,
                  message: 'GitHub Repository name invalid.',
                },
                minLength: 1,
                maxLength: 100,
                validate: {
                  checkConfirmed: () =>
                    repoConfirmed === 'confirmed' ||
                    (repoConfirmed === 'rejected'
                      ? 'Apparently, this repository does not exist on your GitHub account.'
                      : 'Please verify whether this repository exists on your account.'),
                },
              })}
              name='repo'
              className='new-asset'
              type='text'
              placeholder='GitHub Repository'
              style={{
                width: '100%',
                padding: '0.9rem',
                fontSize: 'medium',
                boxSizing: 'border-box',
              }}
            />
            <button
              onClick={checkRepository}
              type='button'
              style={
                repoConfirmed === 'confirmed'
                  ? {
                      backgroundColor: 'var(--main-color-green)',
                    }
                  : repoConfirmed === 'rejected'
                  ? {
                      backgroundColor: 'var(--main-color-red)',
                    }
                  : {}
              }
              disabled={
                repoConfirmed === 'rejected' || repoConfirmed === 'confirmed'
                  ? true
                  : false
              }
            >
              {repoConfirmed !== 'rejected' ? <CheckIcon /> : <Cross1Icon />}
            </button>
          </div>
          <div>
            {errors.repo && (
              <span className='validation-error'>
                {errors.repo?.message.toString()}
              </span>
            )}
          </div>
        </div>

        <div className='text-input'>
          <label htmlFor='title'>
            Tags
            <TooltipInfo content={tooltipTags} />
          </label>
          <Controller
            name='tags'
            control={control}
            rules={{
              required: false,
              validate: {
                checkTagsMinLength: (value) => value.length > 0,
                checkTagsMaxLength: (value) => value.length <= 5,
              },
            }}
            render={({ field: { onChange, value, ref, ...props } }) => (
              <TypePicker
                value={value}
                setValue={setValue}
                tags={watch('tags')}
              />
            )}
          />
          {errors.tags && <p className='validation-error'>Tags invalid.</p>}
        </div>

        <div className='text-input' style={{ width: '90%' }}>
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
            style={{
              width: '100%',
              padding: '0.9rem',
              fontSize: 'medium',
              boxSizing: 'border-box',
            }}
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

        <div className='text-input' style={{ width: '90%' }}>
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
            style={{ width: '100%', boxSizing: 'border-box' }}
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

        <div className='text-input' style={{ width: '90%' }}>
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
            style={{ width: '100%', boxSizing: 'border-box' }}
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
              validate: (value) => value > 0 && value <= 5,
            })}
            name='kokans'
            className='new-asset'
            form='newAsset'
            type='number'
            step='1'
            style={{ display: 'none' }}
          />
          <SliderKokan handlekokans={handleKokans} kokans={watch('kokans')} />
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
