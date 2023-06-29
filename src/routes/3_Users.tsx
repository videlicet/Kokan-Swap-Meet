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
        `${import.meta.env.VITE_SERVER_URL}users/?${query}`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
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
            <User userProps={person} index={index} />
          ))) || (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <span>No matching users.</span>
          </div>
        )
      ) : (
        <div
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <Loading />
        </div>
      )}
    </div>
  )
}

export default Users
