import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../styles/1_App.css'
import login_icon from '../assets/login_icon.png'


const mockUserLoggedIn = {
  loggedIn: true,
  username: "username",
  newCounter: 5
}

const mockUserLoggedOut = {
  loggedIn: false,
  username: "username",
  newCounter: 5
}

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [nav, setNav] = useState(['Home', 'Assets', 'Kokans']);
  const [footer, setFooter] = useState([{name: 'How It Works', route: '/how-it-works'}, {name: 'About', route: '/about'}]);

  const [user, setUser] = useState(mockUserLoggedIn);

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

        <h1>kokan</h1>

        <nav id='header'>
          <ul className='navbar'>
            {nav.map((item, index) => 
              <li className='' key={index}>
                  <NavLink style={({ isActive }) => ({
                      backgroundColor: isActive ? 'lightgrey' : '',
                      color: isActive ? 'black' : 'white',
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
                      to={user.loggedIn == true && `td route` || `td route log in`} >
                    <img id='login_icon' src={login_icon} height='50'/>
                  </NavLink>
                  {user.loggedIn == true && 
                  <>
                    <span>
                      {user.username}
                    </span>
                    <span id='newCounter'>
                      {user.newCounter}
                    </span>
                  </>
                  }
              </li>
          </ul>
        </nav>

        <div id='main-container'>
          <Outlet context={`td`}/>
        </div>   
      </div>
      
      <footer id='footer'>
        <hr/>
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
