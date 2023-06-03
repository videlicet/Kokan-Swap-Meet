import { useState, useEffect, createContext, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

/* import styles */
import '@fontsource/rubik/500.css'
import '../styles/1_App.css'
import brand_icon from '../assets/kokan_icon_w.png'

/* import components */
import {
  MagnifyingGlassIcon,
  PersonIcon,
  PlusIcon,
  HomeIcon,
} from '@radix-ui/react-icons'
import DropdownMenu from '../components/DropDownMenu.tsx'

/* import context */
export const UserContext = createContext({})
export const AssetContext = createContext({})
export const PortalContext = createContext({})

/* import modules*/
import { getUser } from '../modules/Authenticator'

/* helpers */
const footerContent = [
  { name: 'How It Works', route: '/how-it-works' },
  { name: 'About', route: '/about' },
]

function App(): JSX.Element {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTermHandle, setSearchTermHandle] = useState<string>('')
  const [footer, setFooter] = useState(footerContent)
  const [user, setUser] = useState<any>()
  const portal = useRef(null)
  const { register, handleSubmit, reset } = useForm()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) getUser(setUser, navigate, user._id)
  }, [])

  /* search */
  function handleSearchSubmit(data: any) {
    // TODO typing
    setSearchTermHandle(data.search)
    navigate('/assets')
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AssetContext.Provider value={{ searchTermHandle, setSearchTermHandle }}>
        <PortalContext.Provider value={{ portal }}>
          <div className='page-container'>
            <NavLink
              to='/'
              onClick={() => {
                setSearchTermHandle('')
                reset()
              }}
            >
              <h1 id='brand'>
                <img id='brand_icon' src={brand_icon} height='50' />
                okan
              </h1>
            </NavLink>

            <nav id='header'>
              <div className='navbar'>
                <div id='search-bar'>
                  <NavLink
                    to='/assets'
                    style={{ fontSize: 'medium' }}
                    onClick={() => {
                      setSearchTermHandle('')
                      reset()
                    }}
                  >
                    <div className='navbar-element hover'>
                      <HomeIcon className='home-icon' />
                      <span className='home-span'>Swap-Meet</span>
                    </div>
                  </NavLink>

                  <form
                    onSubmit={handleSubmit((data) => handleSearchSubmit(data))}
                    className='navbar-element'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      paddingRight: 0,
                    }}
                  >
                    <input
                      {...register('search')}
                      id='search'
                      name='search'
                      type='text'
                      placeholder='Search assets' // TODO set default in useForm
                    ></input>
                    <button
                      type='submit'
                      className='search-submit'
                      style={{ padding: '0.3rem 0.9rem' }}
                    >
                      <MagnifyingGlassIcon className='search-icon' />
                      <span className='search-span'>search</span>
                    </button>
                  </form>
                </div>
                {user && (
                  <NavLink className='navbar-element hover' to='assets/new'>
                    <div>
                      <PlusIcon className='plus-icon ' />
                      <span className='asset-span'>&nbsp;Asset</span>
                    </div>
                  </NavLink>
                )}
                <div id='profile-link' className='navbar-element hover'>
                  {!user && (
                    <NavLink
                      to='/login'
                      style={{ height: '1rem', width: '2rem' }}
                      className='hover' /* this styling is necessary because the hover effect is blocked by the NavLink tag */
                    >
                      <PersonIcon
                        className='login_icon'
                        style={{
                          position: 'relative',
                          top: '-0.8rem',
                          left: '-1rem',
                          width: '4rem',
                          height: '2.6rem',
                          padding: '0.5rem',
                          boxSizing: 'border-box',
                        }} /* this styling is necessary because the hover effect is blocked by the NavLink tag */
                      />
                    </NavLink>
                  )}
                  {user && (
                    <div className='profile-dropdown'>
                      <DropdownMenu user={user} />
                    </div>
                  )}
                </div>
              </div>
            </nav>

            <div id='main-container' ref={portal}>
              <Outlet />
            </div>
          </div>

          <footer id='footer'>
            <div className='navbar'>
              {footer.map((item) => (
                <NavLink
                  key={item.name}
                  style={({ isActive }) => ({
                    fontWeight: isActive ? 'bold' : '',
                    color: isActive ? 'rgb(221, 213, 207)' : 'grey',
                    borderRadius: isActive ? 15 : 0,
                    mixBlendMode: "difference"
                  })}
                  to={`${item.route}`}
                >
                  {item.name}
                </NavLink>
              ))}
              <div>
                <span>Kokan © 2023</span>
              </div>
            </div>
          </footer>
        </PortalContext.Provider>
      </AssetContext.Provider>
    </UserContext.Provider>
  )
}

export default App
