import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const Authproviders = ({ children }) => {
  const [user, setUser] = useState(null);

  //user register breakdown using firebase
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //user signIn breakdown using firebase
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //user logOut breakdown using firebase
  const logOut = () => {
    return signOut(auth);
  };

  //[use onAuthStateChanged to manage User auth State]
  //etar kaj: user login korar por, user k show korabe.
  //useEffect with observer and return unmount.
  //currentUser is a observer.
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("auth state change", currentUser);
      setUser(currentUser);
    });
    return () => {
      unSubscribe();
    };
  });

  const authInfo = {
    user,
    createUser,
    logIn,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Authproviders;
