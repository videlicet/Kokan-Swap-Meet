import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/1.2_Logout.css'

function Logout(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return (
    <>
      <div id='login-container'>
        <h2>Logout</h2>
        <p>You have been logged out.</p>
        <div>
          <NavLink className='button-like' to='/login'>
            log in
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Logout
