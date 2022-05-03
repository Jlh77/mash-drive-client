import { useEffect, useState } from "react";
import firebase from "../firebase.config";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [dbRef, setDbRef] = useState(firebase.firestore().collection("users"));

  useEffect(() => {
    console.log(dbRef);
  }, []);
  return <>hi</>;
};
export default Home;
