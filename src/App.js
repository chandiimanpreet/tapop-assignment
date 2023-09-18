import { useEffect, useState } from 'react';
import './App.css';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom';
import Protector from './components/auth/Protector';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Loader from './components/Loader';

function App() {

    // States
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null);
    const [loader, setLoader] = useState(true);

    // Handlers
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            else {
                setUser(null);
            }
            setLoader(false);
        })
        return () => {
            unsubscribe();
        }
    }, []);

    if (loader) {
        return (
            <Loader />
        )
    } else {
        return (
            <div className="App">
                <Routes>
                    <Route element={<Protector user={user} />}>
                        <Route path='/' element={<Home user={user} setUser={setUser} image={image} setImage={setImage}  />} />
                    </Route>
                    <Route path='/signIn' element={<SignIn user={user} setUser={setUser} setImage={setImage} />} />
                    <Route path='/signUp' element={<SignUp user={user} setUser={setUser} />} />
                </Routes>
            </div>
        );
    }
}

export default App;
