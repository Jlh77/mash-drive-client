import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, FlatList } from 'react-native'
import { useEffect, useState } from 'react';
import { fetchPostsByUid, fetchUserByUid } from '../utils/utils';
import { getPosts } from "../controllers/index";
import { collection } from "firebase/firestore";
import { db } from "../firebase.config";




const User = ({ route, navigation }) => {
    const { userId } = route.params;
    const [usersPosts, setUsersPosts] = useState([])
    const [usersData, setUsersData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
  const [username, setUsername] = useState("testUser");
    const [posts, setPosts] = useState([]);
    const postsCollection = collection(db, "posts");

    useEffect(() => {
        loadInfo()
    }, [])

    useEffect(() => {
        getPosts(postsCollection).then((data) => {
          setPosts(() => {
            let splicedData = data.splice(6, 6);
            return splicedData;
          });
        });
      }, []);
    
    const loadInfo = async () => {
        const posts = await fetchPostsByUid(userId)
        const user = await fetchUserByUid(userId)
        setUsersPosts(posts)
        setUsersData(user)
        setIsLoading(false)
    }
    

    if (isLoading) {
        <View style={styles.preloader}>
          <ActivityIndicator size='small'></ActivityIndicator>
        </View>;
      } 
    

    return (
    <View style={{backgroundColor: '#F5D349', flex: 1}}>
<View style={{ justifyContent: "center", alignItems: "center",}}>
        <Image style={styles.image} source={usersData.avatar_url}></Image>
        <Text style={styles.username}>{usersData.username}</Text>
        </View>

        <View style={styles.statsBox}>
        <Text style={{fontSize: 30}}>Number of Posts: {usersPosts.length}</Text>
        <Text style={{fontSize: 30}}>Reputation: {usersData.reputation}</Text>
        {/* <Text>Number of Comments: {usersData.array_of_comment_ids}</Text> */}
        </View>
        <View style={{ alignItems: "center" }}>
        <View style={[styles.gallery, styles.wireframeBorder]}>
          <Text style={{ color: "1b242A", fontWeight: "bold", fontSize: 15 }}>
            {" "}
           Newest posts by {usersData.username}{" "}
          </Text>
          <FlatList
            numColumns={2}
            data={posts}
            renderItem={(post) => {
              return (
                <Image
                  style={[styles.imageGallery, styles.wireframeBorder]}
                  source={{ uri: `${post.item.image_url}` }}
                ></Image>
              );
            }}
          ></FlatList>
        </View>
      </View>

        {/* <View>
            <Text>{usersData.username}'s Posts</Text>
            {usersPosts.map(post => {
                return <TouchableOpacity style={styles.postLink} key={post.id} onPress={() => navigation.navigate('Post', { id: post.id})}>
                    <Text>{post.title}</Text>
                    <Text>{post.votes}</Text>
                </TouchableOpacity> 
            })}
        </View> */}
    </View>
    )
}

const styles = StyleSheet.create({

    username: {
        textAlign: "center",
        textTransform: "uppercase",
        fontFamily: '"Times New Roman", Times, serif',
        fontWeight: "bold",
        fontSize: 30,
    },

    image: {
            width: 100,
            height: 100,
            borderRadius: 1000,
            alignItems: "center",
            borderColor: "black",
            borderStyle: "solid",
            borderWidth: 1,

    },
    statsBox: {
        borderWidth: 1,
        backgroundColor: '#6e9176',
        textAlign: 'center',
    },
    postLink: {
        borderWidth: 1,
        backgroundColor: 'beige'
    },
    imageGallery: {
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
})

export default User;