import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from 'react';
import '../styles/1.3_SignUp.css'

function SignUp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


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

    function handleChangeEmail(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    return (
        <>
        <div id='login-container'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className='text-input'>
                    <label htmlFor='username'>Username</label><br/>
                    <input onChange={handleChangeUsername} name='username' type='text' value={username}></input>
                </div>
                <div className='text-input'>
                    <label htmlFor='password'>Password</label><br/>
                    <input onChange={handleChangePassword} name='password' type='text' value={password}></input><br/>
                </div>
                <div className='text-input'>
                    <label htmlFor='email'>E-Mail</label><br/>
                    <input onChange={handleChangeEmail} name='email' type='text' value={email}></input><br/>
                </div>
                <input type='submit' value='sign up'></input>
            </form>
        </div>
        </>
    )
  }
  
  export default SignUp
  