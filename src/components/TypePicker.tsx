import { useState } from 'react'

/* import styles */
import './TypePicker.css'

/* import components */
import { PlusIcon } from '@radix-ui/react-icons'

function TypePicker(): JSX.Element {
  const [tags, setTags] = useState<string[]>([])

  function handleTagSubmit() {
    if ((document.getElementById('tag-input') as any).value != '') {
      const tag: string = (document.getElementById('tag-input') as any).value
      if (!tags?.includes(tag)) setTags([...tags, tag])
    }
  }

  function deleteTag(tag: string) {
    const newTags = tags?.filter((e) => e != tag)
    setTags(newTags)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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

      {tags.length > 0 && (
        <div id='types'>
          {tags?.map((tag: string, index: number) => (
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
