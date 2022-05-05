import { useEffect, useState } from "react";
import { Button, Text, View } from 'react-native';
import { db } from "../firebase.config";
import { StyleSheet, View } from 'react-native';
import { SearchSortBar, Feed } from '../components/index';

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [dbRef, setDbRef] = useState(db.collection("users"));

  useEffect(() => {
   // console.log(dbRef);
  }, []);

  return (
    <View style={styles.container}>
      <SearchSortBar/>
      <Feed/>
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
})


export default Home;
