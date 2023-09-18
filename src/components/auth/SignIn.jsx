import React, { useState } from 'react'
import { auth } from '../../firebase-config';
import { Avatar, Button, TextField, Link, Box, Typography, Container, Alert, Chip } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { GoogleButton } from 'react-google-button';
import { Navigate } from 'react-router-dom';
import { addImage } from '../../user';

const SignIn = ({ user, setUser, setImage }) => {

    // States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userImage, setUserImage] = useState(null);

    const [alert1, setAlert1] = useState(false);
    const [alert2, setAlert2] = useState(false);

    // Handlers
    const fileDataHandler = (e) => setUserImage(e.target.files);
    const chipDeleteHandle = () => setUserImage(null);

    const saveData = async () => {
        try {
            const res = await addImage(userImage);
            setImage(res);
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    }

    const signIn = (e) => {
        e.preventDefault();

        if (password.length < 8) {
            setAlert1(true);

            setTimeout(() => {
                setAlert1(false);
            }, [2000]);
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    setUser(userCredential);

                    saveData();
                }).catch((err) => {
                    setAlert2(true);

                    setEmail('');
                    setPassword('');
                    setUserImage(null);

                    setTimeout(() => {
                        setAlert2(false);
                    }, [2000]);
                    console.log(err);
                });
        }
    };

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((userCredential) => {
                setUser(userCredential.user);
            });
    };

    if (user) {
        return <Navigate to={'/'} />
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {alert2 && <Alert severity="error">User does not exist</Alert>}
                <Box component="form" onSubmit={signIn} noValidate sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth id="email" label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}
                        name="email" autoComplete="email" autoFocus
                    />
                    <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password"
                        autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    {
                        alert1 && <Alert severity="error">Password length must be of greater than 8</Alert>
                    }
                    <div style={{ display: 'flex', columnGap: '12px' }}>
                        <input name='idProof' onChange={(e) => { fileDataHandler(e); }}
                            accept="image/*" style={{ display: 'none' }} id="raised-button-file" type="file"
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" component="span"  >
                                Upload Image
                            </Button>
                        </label>
                        <Box>
                            {
                                userImage && (
                                    <Chip label={userImage[0].name} onDelete={chipDeleteHandle} size='medium' variant="contained" color='secondary' />
                                )
                            }
                        </Box>
                    </div>

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
                    <Box sx={{ display: 'flex', }} >
                        <GoogleButton onClick={googleSignIn} />
                        <Link href="/signUp" variant="body2">{"Don't have an account? Sign Up"}</Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default SignIn
