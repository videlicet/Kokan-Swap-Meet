import { useState, ChangeEvent, FormEvent } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/3_Assets.css'
import brand_icon from '../assets/kokan_icon_w.png'

/* import components */
import Asset from '../components/Asset.tsx'

import { mockAssets } from '../assets/mockAssets'
// import { mockUserLoggedIn } from '../assets/mockUsers.tsx'

function Assets() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('sdfsf')
  const [searchTerm, setSearchTerm] = useState('')
  const [userAssets, setUserAssets] = useState(mockAssets)


  //getData(); make a request to get all of the documents

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    /* make a request to the server to get documents with condition x*/
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
    setSearchTerm('');
  }

  function handleChangeSearchTerm(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  return (
    <div id="assets">
      <div>
        <form onSubmit={handleSubmit} className='text-input'>
          <input
            className="search-bar"
            onChange={handleChangeSearchTerm}
            type="text"
            value={searchTerm}
            placeholder="search assets"
          ></input>
        </form>
      </div>
      <div className="asset-overview">
        <div id="user-assets">
          {userAssets.map((item, index) => (
            <NavLink to={`/assets/${item.asset_id}`}>
              <Asset assetProps={item} index={index}></Asset>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Assets
