import { createContext, useState, useContext, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import {
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used inside an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
                if (currentUser) {
                    const userDocRef = doc(db, "users", currentUser.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        setUser({ ...currentUser, name: userData.name, role: userData.role ?? "user" });
                    } else {
                        setUser({ ...currentUser, name: "Invitado", role: "user" });
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const value = { user, loading, signup, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
