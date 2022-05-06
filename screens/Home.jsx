import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { db } from "../firebase.config";
import { SearchSortBar, Feed } from "../components/index";
import { collection } from 'firebase/firestore';
import getPosts from '../controllers/index';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const postsCollection = collection(db, 'posts');

  useEffect(() => {

    getPosts(postsCollection)
      .then((data) => {
        setPosts(() => {
            return data;
        })
      })
 
  }, []);

  return (
    <View style={styles.container}>
      <SearchSortBar/>
      <Feed posts={posts}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
