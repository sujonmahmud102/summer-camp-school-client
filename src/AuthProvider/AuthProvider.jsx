import { createContext, useState } from "react";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

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

    const authInfo = {
        user,
        loading,
        createdByGoogle,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;