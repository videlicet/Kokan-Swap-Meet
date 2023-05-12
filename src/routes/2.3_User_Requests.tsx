import { useState, useContext } from 'react'
import { NavLink, Outlet, useOutletContext } from 'react-router-dom'
import '../styles/2.3_User_Request.css'

/* context */
import { UserContext } from './1_App'

const styleNavBar = ({ isActive }: any) => ({
    color: isActive ? ' rgb(221, 213, 207)' : 'grey',
  })

function UserRequest(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  //const [user, setUser] = useOutletContext() as any[]
  //const {user, setUser} = useContext<any>(UserContext)

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
