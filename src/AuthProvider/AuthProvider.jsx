import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // user created by google
    const provider = new GoogleAuthProvider;
    const createdByGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    // user create by email & password
    const createdByEmailPass = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

     // user signIn by email & password
     const signInByEmailPass = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // signed-in user observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
            // console.log('logged user', loggedUser);
            setUser(loggedUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, []);


    // update profile
    const updateUserInfo = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    };

    // sign out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const authInfo = {
        user,
        loading,
        createdByGoogle,
        createdByEmailPass,
        updateUserInfo,
        signInByEmailPass,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;