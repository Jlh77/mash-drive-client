import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});

  const register = () => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, register }}>
      {props.children}
    </UserContext.Provider>
  );
};
