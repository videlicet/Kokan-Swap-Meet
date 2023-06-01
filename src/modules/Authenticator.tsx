export const authenticate = async (): Promise<{
  status: boolean
  user: any
}> => {
  /*check user has JWT token*/
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}auth`, {
    method: 'GET',
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
  navigate: any,
  to?: string,
): Promise<string | any> => {
  // TODO typing, is this an acutal promis?
  authenticate().then((res) => {
    if (res.status === true) {
      setUser(res.user) // TODO typing
      /* relevant for logging in: redirect to dashboard instead of staying on the page */
      if (to === 'dashboard') navigate(`/user/${res.user.username}/assets`)
    } else {
      return navigate('/login')
    }
  })
}

export const redirectDashboard = (username: any, navigate: any) => {
  navigate(`/user/${username}`)
}

// USER-ROUTE
export const fetchOtherUser = async (id: string) => {
  let res = await fetch(`${import.meta.env.VITE_SERVER_URL}users/${id}`, {
    method: 'POST',
    body: JSON.stringify({
      username: id,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    },
    credentials: 'include',
  })
  if (res.status === 200) {
    let otherUser = await res.json()
    return otherUser
  }
}
