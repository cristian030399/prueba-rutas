import React, { useEffect, useState } from 'react';
import { roles, useAuth } from '../common/auth';
import { useParams } from 'react-router-dom';

function ProfilePage() {
    const auth = useAuth()
    const { username } = useParams();
    const [profileInfo, setProfileInfo] = useState(null)

    useEffect(() => {
        setProfileInfo({username})
    }, [username])

    const canEdit = username === auth.user.username ||
        auth.user.role === roles.admin

    return (
        <>
            <h1>Profile</h1>
            <p>Welcome, {profileInfo?.username}</p>
            {canEdit && (<button>Editar perfil</button>)}
        </>
    )
}

export { ProfilePage }