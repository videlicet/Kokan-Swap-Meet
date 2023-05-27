import { CSSProperties } from 'react'
import PulseLoader from 'react-spinners/PulseLoader'
import '../styles/1_App.css'

function Loading(): JSX.Element {
  return (
    <div id='loader'>
      <PulseLoader
        color='rgb(221, 213, 207)'
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  )
}

export default Loading
