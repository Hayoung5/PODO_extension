import React, { useState, useEffect, useInsertionEffect } from 'react';
import { decryptKeystore } from '../utils/utils';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CryptoJS from 'crypto-js';
const lightwallet = require("eth-lightwallet");

function Login() {
    const [password, setPassword] = useState('');
    const [keyStore, setKeyStore] = useState('');


    useInsertionEffect(() => {;
    },[])
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const handleLoginAccount = () => {
        decryptKeystore(password).then((result) => {setKeyStore(result)});

    };
  
    return (
      <div>
        <div>{"계정 로그인"}</div>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <button onClick={handleLoginAccount}>Log in</button>
      </div>
    );
}

export default Login;