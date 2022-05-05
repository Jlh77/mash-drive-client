import { useEffect, useState } from "react";
import { Button, Text, View } from 'react-native';
import { db } from "../firebase.config";

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [dbRef, setDbRef] = useState(db.collection("users"));

  useEffect(() => {
   // console.log(dbRef);
  }, []);
  return (
    <View>
      <Text>Home Page</Text>
      {/* <Button title="dummy button/click on article link" onPress={() => navigation.navigate('Post')} color="blue" />
      <Button title="dummy button/click on username" onPress={() => navigation.navigate('User')} color="red" /> */}
    </View>
  )
};
export default Home;
