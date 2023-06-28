/* import styles */
import TypePicker from '../components/TypePicker'
import '../styles/6_About.css'

/* import components */
import { ExternalLinkIcon } from '@radix-ui/react-icons'

function About(): JSX.Element {
  return (
    <div id='about-container'>
      <h2>About</h2>
      <p>
        Kokan was developed May–June 2023 as a final project for the Web & App
        Development Bootcamp at WBS Coding School (Berlin, Germany).
      </p>
      <p>
        Kokan is Japanese for 'barter, exchange' (交換, こうかん、koukan), among
        others.
      </p>
      <p>Check out the GitHub Repositories:</p>
      <p>
        <a
          className='link'
          href='https://github.com/videlicet/Kokan-Swap-Meet'
          target='_blank'
        >
          Frontend
          <ExternalLinkIcon />
        </a>
        <span>&nbsp;and&nbsp;</span>
        <a
          className='link'
          href='https://github.com/videlicet/Kokan-Swap-Meet'
          target='_blank'
        >
          Backend
          <ExternalLinkIcon />
        </a>
      </p>
    </div>
  )
}

export default About
