import { useState, useContext } from 'react'
import { NavLink, Outlet, useParams, useNavigate } from 'react-router-dom'
import '../styles/2.3_User_Request.css'

/* context */
import { UserContext } from './1_App'

/*modules*/
import { redirectDashboard } from '../modules/Authenticator'

const styleNavBar = ({ isActive }: any) => ({
  color: isActive ? ' rgb(221, 213, 207)' : 'grey',
  textDecoration: isActive ? 'underline' : 'none',
})

function UserRequest(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useContext<any>(UserContext)
  const { id } = useParams()
  const navigate = useNavigate()

  if (id !== user?.username) redirectDashboard(id, navigate)

  return (
    <div id='user-requests'>
      <ul>
        <li>Requests:</li>
        <li>
          <NavLink style={styleNavBar} to='incoming'>
            incoming
          </NavLink>
        </li>
        <li>
          <NavLink style={styleNavBar} to='outgoing'>
            outgoing
          </NavLink>
        </li>
      </ul>
      <div id="user-requests-outlet">
        <Outlet />
      </div>
    </div>
  )
}

export default UserRequest
