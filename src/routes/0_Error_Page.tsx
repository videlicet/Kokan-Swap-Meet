import { useState, useEffect } from 'react'
import { NavLink, useRouteError } from 'react-router-dom'
import '../styles/0_Errog_Page.css'

import '@fontsource/rubik/500.css'

import brand_icon from '../assets/kokan_icon_w.png'

function ErrorPage(): JSX.Element {
  const [loading, setLoading] = useState(true)
  let error: any
  error = useRouteError() ? useRouteError() : error

  const [footer, setFooter] = useState([
    { name: 'How It Works', route: '/how-it-works' },
    { name: 'About', route: '/about' },
  ])

  const [style, setStyle] = useState('')

  return (
    <>
      <div className='page-container'>
        <NavLink to='/'>
          <h1 id='brand'>
            <img id='brand_icon' src={brand_icon} height='50' />
            okan
          </h1>
        </NavLink>
        
        <div id='main-container'>
          <div id='error-container'>
            <h2>Oops!</h2>
            <p>Sorry, an unexpected error has occurred:</p>
            <p>
              <i>
                {error?.status || error} {error?.statusText}
              </i>
            </p>
            <p>
              <i>{error?.data}</i>
            </p>
          </div>
        </div>
      </div>

      <footer id='footer'>
        <ul className='navbar'>
          {footer.map((item, index) => (
            <li>
              <NavLink
                style={({ isActive }) => ({
                  fontWeight: isActive ? 'bold' : '',
                  color: isActive ? 'black' : 'grey',
                  padding: isActive ? '0 0.8rem' : 0,
                  borderRadius: isActive ? 15 : 0,
                })}
                to={`${item.route}`}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          <li>
            <span>Kokan © 2023</span>
          </li>
        </ul>
      </footer>
    </>
  )
}

export default ErrorPage

/**
 * 
 *                   <NavLink onClick={toggleDropdown} style={({ isActive }) => ({
                        backgroundColor: isActive ? 'lightgrey' : '',
                        color: isActive ? 'black' : 'white',
                        padding: isActive ? '0 0.8rem' : 0,
                        borderRadius: isActive ? 15 : 0,
                        })} 
                        to={user.loggedIn == true && `user/1` || `/login`} >

                  </NavLink>
 */
