import { NavLink, Outlet } from 'react-router-dom'
import '../styles/2.3_User_Request.css'

/* styles */
const styleNavBar = ({ isActive }: any) => ({
  color: isActive ? ' rgb(221, 213, 207)' : 'grey',
  textDecoration: isActive ? 'underline' : 'none',
})

function UserRequest(): JSX.Element {
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
