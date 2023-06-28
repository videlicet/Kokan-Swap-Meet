import { useState, useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

/* import styles */
import '../styles/3_Users.css'

/* import components */
import User from '../components/User.tsx'
import Loading from '../components/Loading.tsx'

/* import context */
import { AssetContext, UserContext } from './1_App.tsx'

function Users(): JSX.Element {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const { user } = useContext<any>(UserContext)
  const { searchTermHandle, searchTagHandle } = useContext<any>(AssetContext)

  async function getUsers(
    searchTerm: string,
    searchTag: string,
    pageNumbers?: number,
    resultsPerPage?: number,
  ) {
    try {
      if (!pageNumbers) {
        pageNumbers = 0
      }
      if (!searchTerm) {
        searchTerm = ''
      }
      if (!resultsPerPage) {
        resultsPerPage = 20
      }
      const query = `query=${searchTerm}&tags=${searchTag}&page=${pageNumbers}`
      // TODO REWRITE TO SEARCH FOR USERS

      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}users/search`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({ user: { searchTerm: searchTerm } }),
        },
      )
      if (res.status === 200) {
        const data = await res.json()
        setUsers(data)
      } else {
        setUsers([])
      }
    } catch (err) {
      setUsers([])
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      getUsers(searchTermHandle, searchTagHandle)
    }
  }, [searchTermHandle])

   // TODO styles! USERS COMPONENT
  return (
    <div id='users'>
      {!loading ? (
        (users.length > 0 &&
            users.map((person: any, index: number) => (
            <NavLink key={index} to={`/users/${person._id}`}>
                <User 
                  userProps={person}
                  index={index}
                />
            </NavLink>
          ))) || (
          <div className='user' style={{ height: '5rem' }}>
            No matching users.
          </div>
        )
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Users
