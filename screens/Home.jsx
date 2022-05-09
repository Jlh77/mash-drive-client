import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { db } from "../firebase.config";
import { SearchSortBar, Feed } from "../components/index";
import { collection } from 'firebase/firestore';
import getPosts from '../controllers/index';

const Home = ({ route }) => {
  const [posts, setPosts] = useState([]);
  const postsCollection = collection(db, 'posts');
  // const setCurrentRoute = route.params?.setCurrentRoute;
  
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
      <Feed posts={posts} />
      {/* <Feed posts={posts} setCurrentRoute={setCurrentRoute} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
