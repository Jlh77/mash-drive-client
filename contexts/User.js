import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";

export const UserContext = createContext();

export const useAuth = () => {
  return useContext(UserContext);
};

export const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const register = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, register }}>
      {!isLoading && props.children}
    </UserContext.Provider>
  );
};
