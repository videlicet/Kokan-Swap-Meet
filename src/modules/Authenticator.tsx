import { NavigateFunction } from 'react-router-dom'

export const authenticate = async (
  id?: string,
): Promise<{
  status: boolean
  user: any
}> => {
  /*check user has kokan JWT token*/
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}users/${id}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    },
  })
  if (res.status === 200) {
    const user = await res.json()
    return { status: true, user: user }
  }
  return { status: false, user: {} }
}

export const getUser = async (
  setUser: any,
  navigate: NavigateFunction,
  id?: string,
  to?: string,
): Promise<void> => {
  const user = await fetchUser(navigate, id ? id : undefined)
  setUser(user) // TODO typing
  /* relevant for logging in: redirect to dashboard instead of staying on the page */
  if (to === 'dashboard') navigate(`/me/assets`)
}

export const redirectDashboard = (username: any, navigate: any) => {
  navigate(`/me`)
}

// USER-ROUTE
export const fetchUser = async (navigate: NavigateFunction, id?: string) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}users/${id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
    let user = await res.json()
    return user
  } catch (err) {
    // TODO ERROR HANDLING
    return navigate('/login')
  }
}
// USER-ROUTE
export const fetchOtherUser = async (id: string) => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}users/${id}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify({
      username: id,
    }),
  })
  if (res.status === 200) {
    let otherUser = await res.json()
    return otherUser
  }
}
