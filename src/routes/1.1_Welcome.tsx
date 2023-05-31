import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

/* impmort context */
import { UserContext, PortalContext } from './1_App'

function Welcome(): JSX.Element {
  const { user, setUser } = useContext<any>(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {navigate(`user/${user?.username}/assets`)} 
    else return navigate('/login')
  }, [])

  return (
    <></>
  )

}

export default Welcome
