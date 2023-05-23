import React from 'react';
import { useAuth } from '../common/auth';

function LogoutPage() {
    
    const auth = useAuth()

    const logout = (e) => {
        e.preventDefault()
        auth.logout()
        console.log('Cierra sesión')
    }
    return (
        <>
            <h1>Logout</h1>
            <form onSubmit={logout}>
                <label htmlFor="">¿Sguro de que quieres salir?</label>

                <button type='submit'>Salir</button>
            </form>
        </>
    )
}

export { LogoutPage }