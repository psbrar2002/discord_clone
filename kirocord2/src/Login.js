import React from 'react';
import './Login.css';
import { Button } from '@mui/material';
import { auth, provider } from './firebase';
function Login() {
    const signIn = () => {
        //google login
        auth.signInWithPopup(provider).catch((error) => alert(error.message));
    };
    return (
        <div className='login'>
            <div className="login__logo"><img src="https://images-ext-2.discordapp.net/external/PHht33iRuEjw52HZT_D1X60ol7balMmKBs3aGjqN9jg/%3Fsize%3D160%26quality%3Dlossless/https/cdn.discordapp.com/emojis/983509141161123902.webp?format=webp&width=132&height=132" alt="" />
            </div>
            <Button onClick={signIn}> Sign In </Button>
        </div>


    )
}

export default Login;