import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase.config";

export const UserContext = createContext();

export const useAuth = () => {
  return useContext(UserContext);
};

export const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const register = async (email, password, username) => {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    return await db.collection("users").doc(cred.user.uid).set({
      username,
      upvoted_posts: [],
      downvoted_posts: [],
      upvoted_comments: [],
      downvoted_comments: [],
      comments: [],
    });
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((res) => {
            setCurrentUser({ ...user._delegate, ...res.data() });
          })
          // testing catch, deal with
          .catch((err) => {
            alert("Error loading the user into context");
          });
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const values = {
    currentUser,
    setCurrentUser,
    register,
    login,
    logout,
    resetPassword,
  };

  return (
    <UserContext.Provider value={values}>
      {!isLoading && props.children}
    </UserContext.Provider>
  );
};
