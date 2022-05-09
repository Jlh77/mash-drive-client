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
      console.log(post, 'post');
      setPostAuthorData(author);
      console.log(author, 'author');
      setCommentData(comments);
      console.log(comments, 'comments');
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
        <View>
          <Text style={styles.headerTitle}>{postData.title}</Text>
          <Text>{postData.description}</Text>
          <Image
            style={styles.image}
            source={{ uri: postData.image_url }}
          ></Image>
          <Text>Votes: {postData.votes}</Text>
        </View>
        <View>
          <Image
            style={styles.image}
            source={{ uri: postAuthorData.avatar_url }}
          ></Image>
          <Text>Posted By: {postAuthorData.username}</Text>
          <Text>Reputation: {postAuthorData.reputation}</Text>
        </View>
        <View>
          <Text style={styles.headerTitle}>Comments</Text>
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
  headerTitle: {
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  image: {
    height: 200,
    width: 200,
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
});
