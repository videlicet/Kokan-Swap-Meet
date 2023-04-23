import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from 'react';
import '../styles/1.1_Login.css'

function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('sdfsf');
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
                    <label htmlFor='above'>Username</label><br/>
                    <input onChange={handleChangeUsername} name='above' type='text' value={username}></input>
                </div>
                <div className='text-input'>
                    <label htmlFor='below'>Password</label><br/>
                    <input onChange={handleChangePassword} name='below' type='text' value={password}></input><br/>
                </div>
                <input type='submit' value='REGISTER'></input>
            </form>
            <div>
                <button>SIGN UP</button>
            </div>
        </div>
        </>
    )
  }
  
  export default App
  