import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import axios from 'axios'

import serverURL from '../../server_URL'

/* component */

const Authenticator: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  async function hasJWT() {
    let flag = false


    //check user has JWT token
    // const requestHeaders: HeadersInit = new Headers()
    // requestHeaders.set('Content-Type', 'application/json');
    // requestHeaders.set("Access-Control-Allow-Credentials", true)
    const res = await fetch(`${serverURL}login`, {
      method: "get",
      credentials: "include",
    //  headers: requestHeaders
    })
    console.log(res)
    
    //localStorage.getItem('token') ? (flag = true) : (flag = false)

    return flag
  }
  // wrap this in a useEffect
  hasJWT()

  return <div>{loggedIn.toString()}</div>
}

export default Authenticator
