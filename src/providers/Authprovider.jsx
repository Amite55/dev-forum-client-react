import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import axios from 'axios';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const Authprovider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create user ============
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const singInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = async () => {
        setLoading(true)
        await axios.get(`${import.meta.env.VITE_API_URL}/logout`)
        return signOut(auth)
    }
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const signInWithGithub = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider)
    }
    const updateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })
    }

    // save user database ====
    const saveUser = async (user) => {
        const currentUser = {
            name: user?.displayName,
            email: user?.email,
            role: "user",
            badge: "Bronze"
        }
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/user`, currentUser)
        return data;
    }

    // Get token from server
    const getToken = async email => {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            { email },
            { withCredentials: true }
        )
        const token = response.data.token; // Extract token from response
        console.log('Token received from server:', token);
        return data
    }
    // observer ==========
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                    // == get token store client
                    const userInfo = {email: currentUser.email};
                    axios.post(`${import.meta.env.VITE_API_URL}/jwt`, userInfo)
                    .then(res => {
                        if(res.data.token){
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }
                    })
                     saveUser(currentUser)
            }
            else{
                // somethings
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [axios])
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, currentUser => {
    //         setUser(currentUser);
    //         if (currentUser) {
    //             getToken(currentUser?.email);
    //             saveUser(currentUser)
    //         }
    //         setLoading(false);
    //     });
    //     return () => {
    //         return unsubscribe();
    //     }
    // }, [])

    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        singInUser,
        logOut,
        signInWithGoogle,
        signInWithGithub,
        updateUserProfile,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;