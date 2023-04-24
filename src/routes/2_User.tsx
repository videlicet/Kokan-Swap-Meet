import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from 'react';
import '../styles/2_User.css'
import profile_picture from '../assets/profile_picture.png'
import brand_icon from '../assets/kokan_icon_w.png'

type mockAsset = {
    name: string;
    kokans: number;
    type: string[];
    shortDescription: string;
    licence: string; 
}

const mockAssets = [
    {
        name: 'asset1',
        kokans: 3,
        type: ['code', 'web-app'],
        shortDescription: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta nisi saepe ea ducimus. Commodi quisquam, ullam unde quaerat nesciunt optio accusantium dicta ea quam ex alias nisi quibusdam sint in?',
        licence: 'MIT'
    },
    {
        name: 'asset2',
        kokans: 5,
        type: ['code', 'web-app'],
        shortDescription: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta nisi saepe ea ducimus. Commodi quisquam, ullam unde quaerat nesciunt optio accusantium dicta ea quam ex alias nisi quibusdam sint in?',
        licence: 'MIT'
    },
    {
        name: 'asset3',
        kokans: 1,
        type: ['code', 'web-app'],
        shortDescription: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta nisi saepe ea ducimus. Commodi quisquam, ullam unde quaerat nesciunt optio accusantium dicta ea quam ex alias nisi quibusdam sint in?',
        licence: 'MIT'
    },
    {
        name: 'asset1',
        kokans: 3,
        type: ['code', 'web-app'],
        shortDescription: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta nisi saepe ea ducimus. Commodi quisquam, ullam unde quaerat nesciunt optio accusantium dicta ea quam ex alias nisi quibusdam sint in?',
        licence: 'MIT'
    },
    {
        name: 'asset2',
        kokans: 5,
        type: ['code', 'web-app'],
        shortDescription: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta nisi saepe ea ducimus. Commodi quisquam, ullam unde quaerat nesciunt optio accusantium dicta ea quam ex alias nisi quibusdam sint in?',
        licence: 'MIT'
    },
    {
        name: 'asset3',
        kokans: 1,
        type: ['code', 'web-app'],
        shortDescription: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta nisi saepe ea ducimus. Commodi quisquam, ullam unde quaerat nesciunt optio accusantium dicta ea quam ex alias nisi quibusdam sint in?',
        licence: 'MIT'
    },
]

function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('sdfsf');
    const [password, setPassword] = useState('');
    const [userAssets, setUserAssets] = useState(mockAssets);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
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
        setUsername('');
        setPassword('');
    }

    function handleChangeUsername(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }
  
    function handleChangePassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    return (
        <>
        <div id='user-container'>
            <div id='user-assets'>
            {userAssets.map((item, index) => 
                <div className='asset' key={index}>
                    <div className='header'>
                        <div> 
                            <span className='title'>{item.name}</span>
                            <span className='kokans'>{item.kokans}</span>
                        </div>
                        <span className='licence'>{item.licence}</span>
                    </div>
                    <div className='description'>
                        <span>{item.shortDescription}</span>
                    </div>
                    <span>{item.type.map(item => <span className='tag'>{item}</span>)}</span>
                </div>)}
            </div>
            <div id='user-info'>
                <img src={profile_picture} alt='profile-picture' height='150px'/>
                <span>username</span>
                <span><img src={brand_icon} alt='kokans' height='20px'/>number of kokans</span>
            </div>
        </div>
        </>
    )
  }
  
  export default App
  