import {
  ScrollView,
  View,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Button,
  Text,
  FlatList,
  Image,
} from "react-native";
import { db } from "../firebase.config";
import { useAuth } from "../contexts/User";
import { DefaultAvatar, DefaultImg } from '../img/avatar'
import { collection } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { getPosts } from '../controllers/index';





const Account = ({ navigation }) => {

  const [posts, setPosts] = useState([]);
  const postsCollection = collection(db, 'posts');
  const [username, setUsername] = useState("testUser");
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    getPosts(postsCollection)
    .then((data) => {
        setPosts(() => {
            return data;
        })
    })
}, []);

  const handleDelete = async () => {};

  const handleLogout = async () => {
    console.log(currentUser);
    try {
      await logout();
    } catch (err) {
      alert(`Logout failed: ${err}`);
    }
  };

  if (isLoading)
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );

  return (
    <ScrollView style={styles.container}>

<DefaultAvatar />
<View>
  <Text style={styles.username}>{username}</Text>
</View>

<View style={[styles.gallery, styles.wireframeBorder]}>
<FlatList numColumns={3} data={posts} renderItem={(post) => {
return <Image style={[styles.image, styles.wireframeBorder]} source={{uri: `${post.item.image_url}`,}}></Image>

 }}></FlatList>
        </View>

<View >
      <View style={styles.footer_logout }>
        <Button style={{ textAlign:"center" }} title="Logout" onPress={handleLogout} color="#E37399" />
      </View> 
      <View style={styles.footer_delete}>
        <Button style={{ textAlign:"center" }} title="Delete Account" onPress={handleDelete} color="#E37399" />
      </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({

image: {

height: 115,
width: 135,
padding: 50,
margin: 2,



},

wireframeBorder: {
  borderColor: "black",
  borderStyle: "solid",
  borderWidth: 1,
},
gallery: {
flexDirection: "row",
flexWrap: "wrap",
justifyContent: "space-evenly",
padding: 10,
backgroundColor: 'beige'
},
row: {
display: 'flex',
flexWrap: 'wrap',
padding: 10
},

column: {
  /* flex: '25%',
  maxWidth: '25%', */
  padding: 10
},

column_img: {
marginTop: 8,
textAlignVertical: 'center',
width: 100,
backgroundColor: 'black'
},

  footer_delete: {
alignItems:'center'
  },
  footer_logout: {
    alignItems:'center',
marginBottom:'10px'
  },
  username: {
textAlign: "center",
textTransform: 'uppercase',
fontFamily: '"Times New Roman", Times, serif',
fontWeight: 'bold',
fontSize: 30,
  },
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginBottom: 7,
  },
});

export default Account;
