import Loading from '../components/Loading'
import '../styles/4_How_It_Works.css'

function HowItWorks(): JSX.Element {
  async function checkExpiration() {
    console.log('triggered')
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}transactions/test`, // TD remove test
      {
        method: 'POST',
        body: JSON.stringify({
          user: { _id: '64652d03be38707e5557f649' },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )
  }

  return (
    <div id='how-it-works-container'>
      <h2>How It Works</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
        placeat animi cupiditate natus deserunt vero, repellat doloribus enim
        necessitatibus voluptatum! Dolor, officia sapiente voluptate animi eius
        quos delectus quasi atque!
      </p>
      <button onClick={checkExpiration}>EXPIRED?</button>
    </div>
  )
}

export default HowItWorks
