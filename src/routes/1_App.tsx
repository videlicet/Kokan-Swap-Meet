// @ts-nocheck
import { useState, useEffect, createContext, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import '../styles/1_App.css'
import '@fontsource/rubik/500.css'

/* import components */
import brand_icon from '../assets/kokan_icon_w.png'
import {
  MagnifyingGlassIcon,
  PersonIcon,
  PlusIcon,
} from '@radix-ui/react-icons'
import DropdownMenu from '../components/DropDownMenu.tsx'

/* context */
export const UserContext = createContext({})
export const AssetContext = createContext({})
export const PortalContext = createContext({})

/*modules*/
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
    getUser(setUser, navigate)
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
                <div style={{ display: 'flex', gap: '1rem', height: '100%' }}>
                  <NavLink
                    className='navbar-element'
                    to='/assets'
                    style={{ fontSize: 'medium' }}
                    onClick={() => {
                      setSearchTermHandle('')
                      reset()
                    }}
                  >
                    Swap-Meet
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
                      style={{ width: '25rem' }}
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
                  <div className='navbar-element hover'>
                    <NavLink to='assets/new' style={{ color: 'inherit' }}>
                      <PlusIcon
                        style={{ position: 'relative', top: '0.1rem' }}
                      />
                      &nbsp;Asset
                    </NavLink>
                  </div>
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
                          top: '-0.8rem',
                          left: '-1rem',
                          width: '4rem',
                          height: '2.6rem',
                          padding: '0.6rem',
                        }} /* this styling is necessary because the hover effect is blocked by the NavLink tag */
                      />
                    </NavLink>
                  )}
                  {user && (
                    <div className='profile-name'>
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
                    color: isActive ? 'black' : 'grey',
                    padding: isActive ? '0 0.8rem' : 0,
                    borderRadius: isActive ? 15 : 0,
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
