import React, { useState } from 'react';
import { useAuth } from '../common/auth';
import { Navigate, useLocation } from 'react-router-dom';

function LoginPage() {
    const auth = useAuth()
    const [usermane, setUsername] = useState('')    

    const login = (e) => {
        e.preventDefault()
        auth.login({ username: usermane })
    }
    
    if(auth.user) {        
        return (<Navigate to={`/profile/${auth.user.username}`} />)
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={login}>
                <label htmlFor="">Escribe tu nombre de usuario</label>
                <input type="text"
                    value={usermane}
                    onChange={(e) => setUsername(e.target.value)} />

                <button type='submit'>Entrar</button>
            </form>
        </>
    )
}

export { LoginPage }