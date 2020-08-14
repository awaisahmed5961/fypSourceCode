

import React, { useContext, useEffect } from 'react'
import NavBar from './NavBar'
import AuthContext from '../context/auth/authcontext'


export default function Dashboard() {
    const authContext = useContext(AuthContext);
    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <NavBar />
            hello from dashboard
        </div>
    )
}
