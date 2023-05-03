import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/1.1_Login.css'

function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
        <div id='login-container'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='text-input'>
                    <label htmlFor='username'>Username</label>
                    <input onChange={handleChangeUsername} name='username' type='text' value={username}></input>
                </div>
                <div className='text-input'>
                    <label htmlFor='password'>Password</label>
                    <input onChange={handleChangePassword} name='password' type='text' value={password}></input>
                </div>
                <input type='submit' value='login'></input> <NavLink className='button-like' to='/sign-up'>sing up</NavLink>
            </form>
        </div>
        </>
    )
  }
  
  export default Login
  