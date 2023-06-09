import { useState } from 'react'

/* import styles */
import './TypePicker.css'

/* import components */
import { PlusIcon } from '@radix-ui/react-icons'

/* types */
interface Props {
  value: any // TODO typing
  tags: any // TODO typing
  setValue: any // TODO typing
}

function TypePicker(props: Props): JSX.Element {
  //console.log('value ', props.value)

  function handleTagSubmit() {
    if ((document.getElementById('tag-input') as any).value != '') {
      const tag: string = (document.getElementById('tag-input') as any).value
      if (!props?.value) {
        props?.setValue('tags', [tag])
      } else if (!props?.value.includes(tag)) {
        props?.setValue('tags', [...props.value, tag])
      }
    }
    ;(document.getElementById('tag-input') as any).value = ''
  }

  function deleteTag(tag: string) {
    const newTags = props?.value?.filter(
      (tagCurrent: string) => tagCurrent != tag,
    )
    props.setValue('tags', [...newTags])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {(!props?.tags || props?.tags?.length < 5) && (
        <div style={{ display: 'flex', width: '100%', gap: '1rem' }}>
          <div id='type-picker'>
            <input
              name='tags'
              className='new-asset'
              id='tag-input'
              type='text'
              placeholder='Tag'
              style={{
                width: '100%',
                padding: '0.9rem',
                fontSize: 'medium',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <button
              onClick={() => handleTagSubmit()}
              type='button'
              style={{ height: '100%' }}
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      )}

      {props.tags?.length > 0 && (
        <div id='types'>
          {props.tags?.map((tag: string, index: number) => (
            <div className='type' key={index}>
              <span id={'tag' + index.toString()} className='type-name'>
                {tag}
              </span>
              <button
                onClick={() => {
                  deleteTag(
                    document.getElementById(`tag${index.toString()}`).innerText,
                  )
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TypePicker
