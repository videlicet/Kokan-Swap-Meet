import { useState, ChangeEvent, FormEvent } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/2_User.css'
import brand_icon from '../assets/kokan_icon_w.png'

/* import components */
import Asset from '../components/Asset.tsx'

import { mockAssets } from '../assets/mockAssets'
import { mockUserLoggedIn } from '../assets/mockUsers.tsx'


/* function component */
function UserAssets(): JSX.Element {
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
    //setUserAssets([])
  }

  return (
      <div id="user-assets">
        {userAssets.map((item, index) => (
          <NavLink to={`/assets/${item.asset_id}`} className="unstyledLink">
            <Asset assetProps={item} index={index}></Asset>
          </NavLink>
        ))}
      </div>
  )
}

export default UserAssets
