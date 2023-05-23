import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../common/auth';

function Menu() {
    const auth = useAuth()

    return (
        <nav>
            <ul>
                {routes.map(route => {
                    if(route.private && !auth.user) return null
                    if(route.publicOnly && auth.user) return null
                    return (                    
                    <li key={route.to}>
                        <NavLink
                            to={route.to + (route.to ==='/profile' ? `/${auth.user.username}` : '')}
                            style={({ isActive }) => ({
                                background: isActive ? 'green' : 'red'
                            })}>
                            {route.text}
                        </NavLink>
                    </li>
                )})}
            </ul>
        </nav>
    )
}

const routes = [];
routes.push({
    to: '/',
    text: 'Home',
    private: false
})
routes.push({
    to: '/blog',
    text: 'Blog',
    private: false
})
routes.push({
    to: '/profile',
    text: 'Profile',
    private: true
})
routes.push({
    to: '/login',
    text: 'Login',
    publicOnly: true,
    private: false
})
routes.push({
    to: '/logout',
    text: 'Logout',
    private: true
})

export { Menu }