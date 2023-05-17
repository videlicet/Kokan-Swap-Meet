import serverURL from '../../trash/server_URL'

const authenticate = async (): Promise<
  { status: boolean; user: any } | { status: boolean }
> => {
  /*check user has JWT token*/
  const requestHeaders: HeadersInit = new Headers()
  requestHeaders.set('Content-Type', 'application/json')
  requestHeaders.set('Access-Control-Allow-Credentials', true) // QQ can't solve this type issue
  const res = await fetch(`${serverURL}auth`, {
    method: 'get',
    credentials: 'include',
    headers: requestHeaders,
  })
  if (res.status === 200) {
    const user = await res.json()
    return { status: true, user: user }
  }
  return { status: false }
}

export default authenticate
