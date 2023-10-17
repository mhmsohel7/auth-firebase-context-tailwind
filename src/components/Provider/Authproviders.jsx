import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

//create new GoogleAuthProvider outside of main component
const gooleProvider = new GoogleAuthProvider();

const Authproviders = ({ children }) => {
  const [user, setUser] = useState(null);

  //loading state
  const [loading, setLoading] = useState(true);

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

  //GoogleAuthProvider breakdown
  const googleSignIn = () => {
    return signInWithPopup(auth, gooleProvider);
  };

  //[use onAuthStateChanged to manage User auth State]
  //etar kaj: user login korar por, user k show korabe.
  //useEffect with observer and return unmount.
  //currentUser is a observer.
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("auth state change", currentUser);
      setUser(currentUser);

      setLoading(false);
      //loading totokkon hobe, jotokkon porjonto onAuthStateChanged er State change hobe na.
      //state change hole, loading r hobe na. oijonno setLoading(false) korte hobe.
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
    loading,
    googleSignIn,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Authproviders;
