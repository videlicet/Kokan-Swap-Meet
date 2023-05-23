import { useState, useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../styles/2.3_User_Request.css'

/* context */

const styleNavBar = ({ isActive }: any) => ({
    color: isActive ? ' rgb(221, 213, 207)' : 'grey',
    textDecoration: isActive ? 'underline' : 'none',
  })

function UserRequest(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return (
      <div id="user-requests"> {/* user-requests */}
        <ul>
            <li>Requests:</li>
            <li><NavLink style={styleNavBar} to="incoming">incoming</NavLink></li>
            <li><NavLink style={styleNavBar} to="outgoing">outgoing</NavLink></li>
        </ul>
        <Outlet/>
      </div>
  )
}

export default UserRequest
