// @ts-nocheck

export const authenticate = async (): Promise<
  { status: boolean; user: any } | { status: boolean }
> => {
  /*check user has JWT token*/
  const requestHeaders: HeadersInit = new Headers()
  requestHeaders.set('Content-Type', 'application/json')
  requestHeaders.set('Access-Control-Allow-Credentials', true) // QQ can't solve this type issue
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}auth`, {
    method: 'GET',
    credentials: 'include',
    headers: requestHeaders,
  })
  if (res.status === 200) {
    const user = await res.json()
    return { status: true, user: user }
  }
  throw new Error('User not authenticated.') // TD test
}

export const getUser = async (
  setUser: any,
  navigate: any,
  to?: string,
): Promise<string | any> => {
  // TD typing, is this an acutal promis?
  console.log('User authentication:')
  authenticate().then((res) => {
    if (res.status === true) {
      console.log('– User authenticated.')
      setUser(res.user) // TD typing
      /* relevant for logging in: redirect to dashboard instead of staying on the page */
      if (to === 'dashboard') navigate(`/user/${res.user.username}/assets`)
    } else {
      console.log('– User not authenticated.')
      return navigate('/login')
    }
  })
}
