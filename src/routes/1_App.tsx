import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../styles/App.css'
import login_icon from '../assets/login_icon.png'

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nav, setNav] = useState(['Home', 'Projects', 'Kokans']);

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
    <div className='page-container'>

      <h1>koukan</h1>

      <div id='navbar'>
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
                    to={`td route`} >
                  <img id='login_icon' src={login_icon} height='50'/>
                </NavLink>
            </li>
        </ul>
      </div>

      <div className='main-container'>
        <Outlet context={`td`}/>
      </div>

    </div>
  )
}

export default App
