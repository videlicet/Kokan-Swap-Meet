import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Welcome(): JSX.Element {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/assets')
  }, [])

  return (
    <></>
  )

}

export default Welcome
