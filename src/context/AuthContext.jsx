import { createContext, useContext, useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [userData, setUserData] = useState(null)

    const auth = getAuth()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("Auth state changed:", user); 
            if (user) {
                console.log("User  is signed in:", user);
                setUserData({
                    uid: user.uid,
                    email: user.email,
                    photo_url: user.photoURL,
                    displayName: user.displayName,
                    firstName: user.displayName ? user.displayName.split(' ')[0] : '',
                    lastName: user.displayName ? user.displayName.split(' ')[1] : ''
                });
            } else {
                console.log("No user is signed in.");
                setUserData(null);
            }
        });

        return () => unsubscribe() 
    }, [auth]);

    const updateUser = (data) => {
        setUserData(data);
    }

    return (
        <AuthContext.Provider value={{ userData, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}
