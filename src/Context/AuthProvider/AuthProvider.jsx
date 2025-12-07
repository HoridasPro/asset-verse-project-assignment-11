import React, { useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";

const AuthProvider = ({ children }) => {
  // const [user,setUser]=useState(null)
  const [loading, setLoading] = useState(true);
  const registerUserHR = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // For HR manager user
  const UserHRProfileUpdate = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };
  const authInfo = { loading, registerUserHR, UserHRProfileUpdate };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
