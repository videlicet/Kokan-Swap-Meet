import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from 'react'
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom'
import '../styles/1.2_Logout.css'

import serverURL from '../../server_URL'

function Logout(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [user, setUser] = useOutletContext() as any[]

  async function logout() {
    try {
      const res = await fetch(`${serverURL}auth`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      })
      if (res.status == 201) {
        navigate ('/')}
    } catch (error) {
    }
  }

  useEffect(() => {
    logout()
    setUser()
  }, [])

  return (
      <div id='login-container'>
        <h2>Logout</h2>
        <p>You have been logged out.</p>
        <div>
          <NavLink className='button-like' to='/login'>
            log in
          </NavLink>
        </div>
      </div>
  )
}

export default Logout
