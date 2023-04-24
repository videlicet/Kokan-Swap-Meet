import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import '../styles/1_App.css'
import "@fontsource/rubik/500.css";

import login_icon from '../assets/login_icon.png'
import brand_icon from '../assets/kokan_icon_w.png'
import { mockUserLoggedIn, mockUserLoggedOut } from '../assets/mockUsers'



function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [nav, setNav] = useState(['Home', 'Assets', 'Kokans']);
  const [footer, setFooter] = useState([{name: 'How It Works', route: '/how-it-works'}, {name: 'About', route: '/about'}]);

  const [user, setUser] = useState(mockUserLoggedOut);

  const getData = ():void => {
    setLoading(true);
    fetch('/api/v1')
    .then((res) => res.json())
    .then(
      //console.log("Request successful")
    )
    .catch((e) => {
      console.log(e.message)
      setError(e.message)
    })
    .finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    getData();
  },[])

  return (
    <>
      <div className='page-container'>

        <h1 id='brand'><img id='brand_icon' src={brand_icon} height='50'/>okan</h1>

        <nav id='header'>
          <ul className='navbar'>
            {nav.map((item, index) => 
              <li className='' key={index}>
                  <NavLink style={({ isActive }) => ({
                      backgroundColor: isActive ? 'lightgrey' : '',
                      color: isActive ? 'black' : 'rgb(221, 213, 207)',
                      padding: isActive ? '0 0.8rem' : 0,
                      borderRadius: isActive ? 15 : 0,
                      })} 
                      to={`td route`}  className="">
                    {item}
                  </NavLink>
              </li>)}
              <li>
                <NavLink style={({ isActive }) => ({
                      backgroundColor: isActive ? 'lightgrey' : '',
                      color: isActive ? 'black' : 'white',
                      padding: isActive ? '0 0.8rem' : 0,
                      borderRadius: isActive ? 15 : 0,
                      })} 
                      to={user.loggedIn == true && `td route` || `/login`} >
                    <img id='login_icon' src={login_icon} height='50'/>
                    {user.loggedIn == true && 
                    <>
                      <span>
                        {user.username}
                      </span>
                    </>}
                  </NavLink>
                  {user.loggedIn == true && 
                    <NavLink style= {{color: 'white', fontWeight: 'bold'}} to={`td route messages`} >
                    <span id='newCounter'>
                    {user.newCounter}
                    </span>
                  </NavLink>}
              </li>
          </ul>
        </nav>

        <div id='main-container'>
          <Outlet context={`td`}/>
        </div>   
      </div>
      
      <footer id='footer'>

        <ul className='navbar'>
        {footer.map((item, index) => 
          <li>
            <NavLink style={({ isActive }) => ({
                fontWeight: isActive ? 'bold' : '',
                color: isActive ? 'black' : 'grey',
                padding: isActive ? '0 0.8rem' : 0,
                borderRadius: isActive ? 15 : 0,
                })} 
                to={`${item.route}`} >
              {item.name}
            </NavLink>
          </li>)}
          <li><span>Kokan © 2023</span></li>
        </ul>
      </footer>
    </>
  )
}

export default App
