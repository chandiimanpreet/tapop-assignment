import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { auth } from '../firebase-config';
import {  signOut } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

const Navbar = ({user, setUser, setLoader}) => {

    const [isLoggedOut, setIsLoggedOut] = useState(false);
    console.log(user)

    const userSignOut = () => {
        signOut(auth).then(() => {
            setUser(null);
            console.log('Signed Out');
            setLoader(false);
        }).catch((err) => console.log(err));
        
        setIsLoggedOut(true);
    }

    if (!user) {
        return <Navigate to='/signIn' />
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Tapop
                    </Typography>
                    {!isLoggedOut && <Button color="inherit" onClick={userSignOut}>Logout</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar
