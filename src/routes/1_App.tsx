// @ts-nocheck
import {
  useState,
  useEffect,
  createContext,
  ChangeEvent,
  FormEvent,
  useRef,
} from 'react'
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

/* import types */

import { UserInterface } from '../assets/mockUsers.tsx'

/* context */

export const UserContext = createContext({})
export const AssetContext = createContext({})
export const PortalContext = createContext({})

import authenticate from '../modules/Authenticator'

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
  const [searchTerm, setSearchTerm] = useState<string>()
  const [searchTermHandle, setSearchTermHandle] = useState('')
  const [nav, setNav] = useState(navContent)
  const [footer, setFooter] = useState(footerContent)
  const [user, setUser] = useState<any>()
  const portal = useRef(null)

  const navigate = useNavigate()

  /** fetch data */
  const getUser = async (): Promise<void> => {
    console.log('auth triggered')
    authenticate().then((res) => {
      if (res.status === true) {
        console.log('userauthentiasdfasdf')
        setUser(res.user) // TD typing
      } else {
        navigate('/login')
      }
    })
  }

  useEffect(() => {
    getUser()
  }, [])

  /* search */
  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSearchTermHandle(event.target.children[0].value)
    navigate('/')
    setSearchTerm('')
  }

  function handleChangeSearchTerm(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  console.log('UPDATE: App.js updated') // TD console.log

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AssetContext.Provider value={{ searchTermHandle, setSearchTermHandle }}>
        <PortalContext.Provider value={{ portal }}>
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
                  onSubmit={handleSearch}
                  className='navbar-element'
                  style={{
                    height: '100%',
                    width: '40%',
                    display: 'flex',
                    alignItems: 'center',
                    paddingRight: 0,
                  }}
                >
                  <input
                    className='search-bar'
                    onChange={handleChangeSearchTerm}
                    type='text'
                    value={searchTerm}
                    placeholder='Search assets'
                  ></input>
                  <button type='submit' className='search-submit' style={{padding: "0.3rem 0.9rem"}}>
                    <MagnifyingGlassIcon className='search-icon' />
                    <span className='search-span'>search</span>
                  </button>
                </form>
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
                    <NavLink to='/login' style={{height: "1rem", width: "2rem"}} className="hover" /* this styling is necessary because the hover effect is blocked by the NavLink tag */>
                      <PersonIcon
                        className='login_icon'
                        style={{top: '-0.8rem', left: '-1rem', width:"4rem", height: "2.6rem", padding: "0.6rem"}} /* this styling is necessary because the hover effect is blocked by the NavLink tag */
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
        </PortalContext.Provider>
      </AssetContext.Provider>
    </UserContext.Provider>
  )
}

export default App
