import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Welcome(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/assets')
  }, [])

  return (
    <></>
  )

}

export default Welcome
