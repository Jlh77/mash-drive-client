import { useEffect, useState } from "react";
import { db } from "../firebase.config";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [dbRef, setDbRef] = useState(db.collection("users"));

  useEffect(() => {
    console.log(dbRef);
  }, []);
  return <>hi</>;
};
export default Home;
