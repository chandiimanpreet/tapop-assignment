import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Button, Box, Alert } from '@mui/material';
import Navbar from './Navbar';
import { addImage } from '../user';
import './style.css';
import './animation.js';
import { imgMouseEnter, imgMouseMove, imgMouseLeave } from './animation';

const Home = ({ user, setUser, image, setImage, setLoader }) => {

    // States
    const imgRef1 = useRef();

    const [userImage, setUserImage] = useState(null);
    const [forDatabase, setForDatabase] = useState(null);
    const [alert, setAlert] = useState(false);


    // Handlers
    const fileHandler = (e) => {
        setImage(null);
        setUserImage(URL.createObjectURL(e.target.files[0]));
        setForDatabase(e.target.files);
    };

    const saveData = async (e) => {
        e.preventDefault();
        try {
            await addImage(forDatabase);
            setAlert(true);

            setTimeout(() => {
                setAlert(false);
            }, [2000]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (userImage) {
            imgRef1.current.addEventListener('mousemove', imgMouseMove);
            imgRef1.current.addEventListener('mouseleave', imgMouseLeave);
            imgRef1.current.addEventListener('mouseenter', imgMouseEnter);
        }
        if (image) {
            imgRef1.current.addEventListener('mousemove', imgMouseMove);
            imgRef1.current.addEventListener('mouseleave', imgMouseLeave);
            imgRef1.current.addEventListener('mouseenter', imgMouseEnter);
        }
    }, [userImage, image]);

    return (
        <Fragment>
            <Navbar user={user} setUser={setUser} setLoader={setLoader} />
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column' }}>
                <Box component="form" onSubmit={(e) => saveData(e)} sx={{ display: 'flex' }}>
                    <Box sx={{ mt: 3, mb: 2, ml: 3 }}>
                        <input type='file' onChange={fileHandler} />
                        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>Upload</Button>
                        {
                            alert && <Alert severity="success">Image Uploaded</Alert>
                        }
                    </Box>
                </Box>
                <Box sx={{ mt: 7 }}>
                    {   // image got from the signIn page
                        image && (
                            <img ref={imgRef1} src={image.imageUrl} alt="img" id='image-1' className='img' />
                        )
                    }
                    {   // image got that we uploaded in home page
                        userImage && (
                            <img ref={imgRef1} src={userImage}
                                alt="img1" className='img' id='image-2' />
                        )
                    }
                </Box>
            </Box>
        </Fragment>
    )
}

export default Home
