import { useState, ChangeEvent, FormEvent } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/2_User.css'
import brand_icon from '../assets/kokan_icon_w.png'

/* import components */
import ProfileAvatar from '../components/Avatar.tsx'
import Asset from '../components/Asset.tsx'

import { mockAssets } from '../assets/mockAssets'
import { mockUserLoggedIn } from '../assets/mockUsers.tsx'

function User(): JSX.Element {
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
    <div id="user-container">
      <div id="user-assets">
        {userAssets.map((item, index) => (
          <NavLink to={`/assets/${item.asset_id}`} className="unstyledLink">
            <Asset assetProps={item} index={index}></Asset>
          </NavLink>
        ))}
      </div>
      <div id="user-info">
        <ProfileAvatar
          src={mockUserLoggedIn.pictureURL}
          name={mockUserLoggedIn.name}
        ></ProfileAvatar>
        <span>{mockUserLoggedIn.name}</span>
        <span>
          <img src={brand_icon} alt="kokans" height="20px" />
          {mockUserLoggedIn.kokans}
        </span>
      </div>
    </div>
  )
}

export default User
