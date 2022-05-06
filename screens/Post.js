import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react';
import { getCommentsByPostId, fetchPostByPostId, fetchUserByUid } from '../utils/utils';

const Post = ({route, navigation}) => {
    const { id } = route.params;
    const [postData, setPostData] = useState({});
    const [commentData, setCommentData] = useState([]);
    const [postAuthorData, setPostAuthorData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadInfo(id);
    }, [])

    const loadInfo = async (id) => {
       /*  try {
            const post = await fetchPostByPostId(id)
            const author = await fetchUserByUid(post.uid)
            const comments = await getCommentsByPostId(id)
            setPostData(post);
            setPostAuthorData(author);
            setCommentData(comments);
            setIsLoading(false);
        } catch (err) {
            console.log(err)
        } */
    }

    if (isLoading) {
        <View style={styles.preloader}>
          <ActivityIndicator size='large'></ActivityIndicator>
        </View>;
      }

    return (
    <View>
        <Text>Post for recipe {id}'s' Page</Text>
    </View>
    )
}

export default Post;

const styles = StyleSheet.create({
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
  });