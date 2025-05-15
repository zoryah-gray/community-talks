import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userInfo) => setCurrentUser(userInfo);
  const logout = () => setCurrentUser(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user){
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const value = {
    currentUser,
  };
  
  return (
    <AuthContext.Provider value={{currentUser, loading}}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
