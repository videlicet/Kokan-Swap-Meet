import { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'

/* import styles */
import '../styles/1.2_Logout.css'

/* import components */
import Loading from '../components/Loading'

/* import context */
import { UserContext } from './1_App'

function Logout(): JSX.Element {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [loggedOut, setLoggedOut] = useState(false)
  const { user, setUser } = useContext<any>(UserContext)

  async function logout() {
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}auth`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
      })
      if (res.status == 200) {
        setLoggedOut(true)
      }
    } catch (error) {}
    setLoading(false)
  }

  useEffect(() => {
    logout()
    setUser()
  }, [])

  return (
    <div id='logout-container'>
      {!loading ? loggedOut && (
        <>
          <h2>Logout</h2>
          <p>You have been logged out.</p>
          <div>
            <NavLink className='button-like' to='/login'>
              log in
            </NavLink>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Logout
