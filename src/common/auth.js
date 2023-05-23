import React, { useContext, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const roles = {
    admin: 'Admin',
    editor: 'Editor'
}

Object.freeze(roles);

const adminList = [
    {
        username: 'cristian030399',
        role: roles.editor
    },
    {
        username: 'master',
        role: roles.admin
    }];

const AuthContext = React.createContext();

function AuthProvider({ children }) {
    const navigate = useNavigate()
    const userStoraged = JSON.parse(localStorage.getItem('user'))
    const [user, setUser] = useState(userStoraged)
    const location = useLocation()

    const login = ({ username }) => {
        const goTo = location.state?.from;
        const userWithPermissions = adminList.find(user => user.username === username)
        setUser({ username, role: userWithPermissions?.role })
        localStorage.setItem('user', JSON.stringify({ username, role: userWithPermissions?.role }))
        if(goTo) {
            return navigate(goTo)
        }
        navigate(`/profile/${username}`)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
        navigate('/')
    }

    const auth = { user, login, logout }
    return (
        <AuthContext.Provider
            value={auth}
        >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const auth = useContext(AuthContext)
    return auth
}

function AuthRoute({ children, roles = [] }) {
    const auth = useAuth()
    const location = useLocation()

    if (!auth.user) {
        return (<Navigate to="/login" state={{from: location.pathname}} />)
    }

    const canView = roles.length > 0 ? roles.find(role => role === auth.user.role) : true;

    if(!canView) {
        return (<Navigate to='/error' />)
    }

    return children
}

export { AuthProvider, useAuth, AuthRoute, roles }