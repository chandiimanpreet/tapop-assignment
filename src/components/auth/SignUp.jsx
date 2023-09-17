import React, { useState,  } from 'react'
import { auth } from '../../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Avatar, Button, TextField, Box, Typography, Container, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';

const SignUp = ({ user, setUser }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [authUser, setAuthUser] = useState(null);
    const defaultTheme = createTheme();

    const [alert1, setAlert1] = useState(false);
    const [alert2, setAlert2] = useState(false);


    const signUp = (e) => {
        e.preventDefault();

        if (password.length < 8) {
            setAlert1(true);
            setTimeout(() => {
                setAlert1(false);
            }, [2000])
        } else {
            // sign in
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    setUser(userCredential.user);
                    console.log(userCredential.user);
                }).catch((err) => {
                    setAlert2(true);
                    setEmail('');
                    setPassword('');

                    setTimeout(() => {
                        setAlert2(false);
                    }, [2000]);
                    console.log(err)
                })
        }
    };

    if (user) {
        return <Navigate to={'/'} />
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    {alert2 && <Alert severity="error">User already exists</Alert>}
                    <Box component="form" onSubmit={signUp} noValidate sx={{ mt: 1 }}>
                        <TextField margin="normal" required fullWidth id="email" label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}
                            name="email" autoComplete="email" autoFocus
                        />
                        <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password"
                            autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        {
                            alert1 && <Alert severity="error">Password length must be of greater than 8</Alert>
                        }

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default SignUp
