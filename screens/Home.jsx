import { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { db } from "../firebase.config";
import { SearchSortBar, Feed, SearchFeed } from "../components/index";
import { collection } from 'firebase/firestore';
import { getPosts } from '../controllers/index';

const Home = ({ route }) => {
  const [posts, setPosts] = useState([]);
  const postsCollection = collection(db, 'posts');
  const [searchFeedData, setSearchFeedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    getPosts(postsCollection)
      .then((data) => {
        setPosts(() => {
            return data;
        })
        setIsLoading(false);
      })
 
  }, []);

  if (isLoading) {
    return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large"></ActivityIndicator>
        </View>
      );
  } else {
    return (
      <View style={styles.container}>
        <SearchSortBar posts={posts} setSearchFeedData={setSearchFeedData} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {searchFeedData.length > 0 ? 
        <SearchFeed setSearchFeedData={setSearchFeedData} searchFeedData={searchFeedData} searchTerm={searchTerm} /> : 
        <Feed posts={posts} />}
      </View>
    );
  }  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5D349",
  },
});

export default Home;
