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
  import { DefaultAvatar, DefaultImg } from '../img/avatar';
import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getPosts } from "../controllers/index";

const Account = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const postsCollection = collection(db, "posts");
  const [username, setUsername] = useState("testUser");
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    getPosts(postsCollection).then((data) => {
      setPosts(() => {
        let splicedData = data.splice(0, 6);
        return splicedData;
      });
    });
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
        <ActivityIndicator size='large'></ActivityIndicator>
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <DefaultAvatar />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={currentUser.avatar_url}
          style={{
            width: 100,
            height: 100,
            borderRadius: 1000,
            alignItems: "center",
            borderColor: "black",
            borderStyle: "solid",
            borderWidth: 1,
          }}
        />
      </View>
      <View>
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={[styles.gallery, styles.wireframeBorder]}>
          <Text style={{ color: "1b242A", fontWeight: "bold", fontSize: 20 }}>
            {" "}
            {username}'s Gallery{" "}
          </Text>
          <FlatList
            numColumns={2}
            data={posts}
            renderItem={(post) => {
              return (
                <Image
                  style={[styles.image, styles.wireframeBorder]}
                  source={{ uri: `${post.item.image_url}` }}
                ></Image>
              );
            }}
          ></FlatList>
        </View>
      </View>

      <View>
        <View style={styles.footer_logout}>
          <Button
            style={{ textAlign: "center" }}
            title="Logout"
            onPress={handleLogout}
            color="#885a2c"
          />
        </View>
        <View style={styles.footer_delete}>
          <Button
            style={{ textAlign: "center" }}
            title="Delete Account"
            onPress={handleDelete}
            color="#885a2c"
          />
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
    alignContent: "center",
  },

  gallery: {
    margin: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    padding: 10,
    backgroundColor: "#6e9176",
    width: 300,
    alignContent: "center",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    padding: 10,
  },

  column: {
    /* flex: '25%',
  maxWidth: '25%', */
    padding: 10,
  },

  column_img: {
    marginTop: 8,
    textAlignVertical: "center",
    width: 100,
    backgroundColor: "black",
  },

  footer_delete: {
    alignItems: "center",
  },
  footer_logout: {
    alignItems: "center",
    marginBottom: "10px",
  },
  username: {
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: '"Times New Roman", Times, serif',
    fontWeight: "bold",
    fontSize: 30,
  },
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: "#F5D349",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 7,
  },
});

export default Account;
