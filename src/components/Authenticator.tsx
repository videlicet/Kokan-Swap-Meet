import serverURL from '../../server_URL'

const authenticate = async (): Promise<boolean> => {
    let flag = false

    //check user has JWT token
    const requestHeaders: HeadersInit = new Headers()
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set("Access-Control-Allow-Credentials", true) // QQ can't solve this type issue
    const res = await fetch(`${serverURL}auth`, {
      method: "get",
      credentials: "include",
    headers: requestHeaders
    })
    if (res.status === 200) {
        return flag = true
    }
    return flag
}

export default authenticate
