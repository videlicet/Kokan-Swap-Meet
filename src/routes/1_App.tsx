import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../styles/1_App.css'
import '@fontsource/rubik/500.css'

/* Import Components */

import login_icon from '../assets/login_icon.png'
import brand_icon from '../assets/kokan_icon_w.png'
import { mockUserLoggedIn, mockUserLoggedOut } from '../assets/mockUsers'
import { MagnifyingGlassIcon, PersonIcon } from '@radix-ui/react-icons'
import DropdownMenu from '../components/DropDownMenu.tsx'

/* helpers */

const footerContent = [
  { name: 'How It Works', route: '/how-it-works' },
  { name: 'About', route: '/about' },
]

const navContent = [
  { name: 'Home', route: '/' },
  { name: 'Assets', route: '/assets' },
  { name: 'Kokans', route: '/kokans' },
]

function App(): JSX.Element {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [nav, setNav] = useState(navContent)
  const [footer, setFooter] = useState(footerContent)
  const [user, setUser] = useState(mockUserLoggedIn)

  /** fetch data */
  const getData = (): void => {
    setLoading(true)
    fetch('/api/v1')
      .then((res) => res.json())
      .then
      //console.log('Request successful')
      ()
      .catch((e) => {
        console.log(e.message)
        setError(e.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  /* search */

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('search submitted')
    /* make a request to the server to get documents with condition x*/
    setSearchTerm('')
  }

  function handleChangeSearchTerm(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  return (
    <>
      <div className='page-container'>
        <NavLink to='/'>
          <h1 id='brand'>
            <img id='brand_icon' src={brand_icon} height='50' />
            okan
          </h1>
        </NavLink>

        <nav id='header'>
          <div className='navbar'>
            <form
              onSubmit={handleSubmit}
              className='navbar-element'
              style={{
                height: '100%',
                width: '40%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <input
                className='search-bar'
                onChange={handleChangeSearchTerm}
                type='text'
                value={searchTerm}
                placeholder='Search assets'
              ></input>
              <button type='submit' className='search-submit'>
                <MagnifyingGlassIcon className='search-icon' />
              </button>
            </form>
            <div id='profile-link' className='navbar-element'>
              {user.loggedIn !== true && (
                <a href='/login'>
                  <PersonIcon />
                </a>
              )}
              {user.loggedIn == true && (
                <div className='profile-name' >
                  <DropdownMenu user={user} />
                </div>
              )}
            </div>
          </div>
        </nav>

        <div id='main-container'>
          <Outlet context={`td`} />
        </div>
      </div>

      <footer id='footer'>
        <div className='navbar'>
          {footer.map((item) => (
            <div>
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
            </div>
          ))}
          <div>
            <span>Kokan © 2023</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App

/*
<img
id='login_icon'
src={login_icon}
height='50'
onClick={toggleDropdown}
/>

<div id='myDropdown' className={`dropdown-content ${style}`}>
<NavLink to='/user/1/assets' onClick={toggleDropdown}>
  Assets
</NavLink>
<NavLink
  to='/user/1/requests/incoming'
  onClick={toggleDropdown}
>
  Requests
</NavLink>
<NavLink to='/user/1/settings' onClick={toggleDropdown}>
  Settings
</NavLink>
<NavLink to='/logout' onClick={toggleDropdown}>
  Logout
</NavLink>
</div>

*/
