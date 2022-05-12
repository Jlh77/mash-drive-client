import { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { db } from "../firebase.config";
import { SearchBar, Feed, SearchFeed } from "../components/index";
import { collection } from "firebase/firestore";
import { getPosts, getUsers } from "../controllers/index";

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const postsCollection = collection(db, "posts");
  const [users, setUsers] = useState([]);
  const usersCollection = collection(db, "users");
  const [searchFeedData, setSearchFeedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPosts(postsCollection).then((data) => {
      setPosts(() => {
        return data;
      });
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getUsers(usersCollection).then((data) => {
      setUsers(() => {
        return data;
      });
      setIsLoading(false);
    });
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
        <SearchBar
          posts={posts}
          setSearchFeedData={setSearchFeedData}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        {searchFeedData.length > 0 ? (
          <SearchFeed
            setSearchFeedData={setSearchFeedData}
            searchFeedData={searchFeedData}
            searchTerm={searchTerm}
          />
        ) : (
          <Feed posts={posts} users={users} />
        )}
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
