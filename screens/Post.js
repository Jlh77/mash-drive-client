import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useState, useEffect } from 'react';
import {
  getCommentsByPostId,
  fetchPostByPostId,
  fetchUserByUid,
} from '../utils/utils';
import { ScrollView } from 'react-native-gesture-handler';
import CommentForm from '../components/CommentForm';

const Post = ({ route, navigation }) => {
  const { id } = route.params;
  const [postData, setPostData] = useState({});
  const [commentData, setCommentData] = useState([]);
  const [postAuthorData, setPostAuthorData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInfo(id);
  }, [setCommentData]);

  const loadInfo = async (id) => {
    try {
      const post = await fetchPostByPostId(id);
      const author = await fetchUserByUid(post.uid);
      const comments = await getCommentsByPostId(id);
      setPostData(post);
      setPostAuthorData(author);
      setCommentData(comments);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    <View style={styles.preloader}>
      <ActivityIndicator size='large'></ActivityIndicator>
    </View>;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainPostArea}>
          <Text style={styles.headerTitle}>{postData.title}</Text>
          <Image
            style={styles.image}
            source={{ uri: postData.image_url }}
          ></Image>
          <Text>{postData.description}</Text>
          <Text>Votes: {postData.votes}</Text>
          <Image
            style={styles.authorAvatar}
            source={{ uri: postAuthorData.avatar_url }}
          ></Image>
          <Text>Posted By: {postAuthorData.username}</Text>
          <Text>Reputation: {postAuthorData.reputation}</Text>
        </View>
        <View style={styles.commentsSection}>
          <Text style={styles.commentsHeader}>Comments</Text>
          {commentData.map((comment) => {
            return (
              <View key={comment.id}>
                <Text>Comment by {comment.username}</Text>
                <Text>Reputation: </Text>
                <Text>Comment body text : {comment.text_body}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <CommentForm postId={postData.id} setCommentData={setCommentData} />
    </SafeAreaView>
  );
};

export default Post;

const styles = StyleSheet.create({
  mainPostArea: {
    borderWidth: 4,
    justifyContent: 'center',
  },
  commentsSection: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
    textTransform: 'capitalize',
    borderWidth: 1,
    backgroundColor: 'beige',
  },
  
  headerTitle: {
    textTransform: 'capitalize',
    textAlign: 'center',
    fontSize: 40,
  },
  commentsHeader : {
    textAlign: 'center',
    fontSize: 25,
  },
  image: {
    height: 200,
    width: 200,
  },
  authorAvatar: {
    height: 50,
    width: 50,
  },
  container: {
    flex: 1,
    padding: 35,
    borderWidth: 1,

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
