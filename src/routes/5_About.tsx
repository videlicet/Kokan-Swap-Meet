/* import styles */
import '../styles/5_About.css'

/* import components */
import { ExternalLinkIcon } from '@radix-ui/react-icons'

function About(): JSX.Element {
  return (
    <div id='about-container'>
      <h2>About</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
        placeat animi cupiditate natus deserunt vero, repellat doloribus enim
        necessitatibus voluptatum! Dolor, officia sapiente voluptate animi eius
        quos delectus quasi atque!
      </p>
      <a href='https://github.com/videlicet/Kokan-Swap-Meet' target='_blank'>
        <ExternalLinkIcon />
        &nbsp;GitHub Repository
      </a>
    </div>
  )
}

export default About
