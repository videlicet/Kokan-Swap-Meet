// @ts-nocheck

export const authenticate = async (): Promise<
  { status: boolean; user: any } | { status: boolean }
> => {
  console.log('User authentication:')
  /*check user has JWT token*/
  const requestHeaders: HeadersInit = new Headers()
  // are thes headers the issue?
  requestHeaders.set('Content-Type', 'application/json')
  requestHeaders.set('Access-Control-Allow-Credentials', true) // QQ can't solve this type issue
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}auth`, {
    headers: requestHeaders,
    credentials: 'include',
  })
  if (res.status === 200) {
    console.log('– User authenticated.')
    return { status: true }
  }
  throw new Error('X User not authenticated.') // TD test
}

export const getUser = async (
  setUser: any,
  navigate: any,
  to?: string,
  id?: string,
): Promise<string | any> => {
  // TD typing, is this an acutal promise?
  console.log('Get user:')
  console.log('id: ', id)
  try {
    let authentication = await authenticate()
    if (authentication.status === true) {
      try {
        const requestHeaders: HeadersInit = new Headers()
        requestHeaders.set('Content-Type', 'application/json')
        requestHeaders.set('Access-Control-Allow-Credentials', true) // QQ can't solve this type issue
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}users/${id}`,
          {
            method: 'POST',
            body: JSON.stringify({
              username: id,
            }),
            headers: requestHeaders,
            credentials: 'include',
          },
        )
        if (res.status === 200) {
        console.log('– User found.')
          const user = await res.json()
          setUser(user) // TD typing
          /* relevant for logging in: redirect to dashboard instead of staying on the page */
          if (to === 'dashboard') navigate(`/user/${user.username}/assets`)
          return user
        }
      } catch (err) {
        console.log('–X No user found.')
        console.log(err)
      }
    } else {
      console.log('–X User not authenticated.')
      return navigate('/login')
    }
  } catch (err) {
    console.log('X Get user failed.')
    console.log(err)
  }
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
    },
    credentials: 'include',
  })
  if (res.status === 200) {
    let otherUser = await res.json()
    return otherUser
  }
}
