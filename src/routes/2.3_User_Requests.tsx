import { useState, ChangeEvent, FormEvent } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import '../styles/2.3_User_Request.css'
import brand_icon from '../assets/kokan_icon_w.png'

/* import components */
import Asset from '../components/Asset.tsx'

import { mockAssets } from '../assets/mockAssets'
import { mockUserLoggedIn } from '../assets/mockUsers.tsx'

const styleNavBar = ({ isActive }: any) => ({
    color: isActive ? ' rgb(221, 213, 207' : 'grey',
  })


/* function component */
function UserRequest(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('sdfsf')
  const [password, setPassword] = useState('')
  const [userAssets, setUserAssets] = useState(mockAssets)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    /*axios.post(
                "https://api.imgflip.com/caption_image",
                {
                    form: {
                        template_id: '181913649',
                        username: 'USERNAME',
                        password: 'PASSWORD',
                        text0: 'text0',
                        text1: 'text1',
                    },
                }
            )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });*/
    setUsername('')
    setPassword('')
  }

  function handleChangeUsername(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
  }

  function handleChangePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  return (
      <div id="user-requests"> {/* user-requests */}
        <ul>
            <li>Requests:</li>
            <li><NavLink style={styleNavBar} to="incoming">incoming</NavLink></li>
            <li ><NavLink style={styleNavBar} to="outgoing">outgoing</NavLink></li>
        </ul>
        <Outlet/>
      </div>
  )
}

export default UserRequest