import { View, Text, ScrollView, StyleSheet, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../contexts/User';
import { submitComment, incrementCommentCount } from '../utils/utils';

const CommentForm = ({ navigation, postId, setCommentData }) => {
  const [commentBody, setCommentBody] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async () => {
    //make comment object
    const commentToSubmit = {};
        commentToSubmit.username = currentUser.username;
        commentToSubmit.uid = currentUser.uid;
        commentToSubmit.post_id = postId;
        commentToSubmit.text_body = commentBody;
        commentToSubmit.votes = 0;    

    //optimisticly render comments with new comment on top
    setCommentData((curr) => {
        return ([commentToSubmit, ...curr])
    })

    try {
        //post to comment collection
        const res = await submitComment(commentToSubmit);

        //increment posts comment count + add comment to users comments array
        const inc = await incrementCommentCount(postId, currentUser.uid);
    } catch (err) {

    }
    //make form text input empty
    setCommentBody('')
  }

  if (!currentUser) {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        <Text>Please login to leave a comment</Text>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView>
      <Text>Logged in as {currentUser.username}</Text>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder={'Leave A Comment'}
          value={commentBody}
          onChangeText={setCommentBody}
        ></TextInput>
      </View>
      <View style={styles.inputGroup}>
          <Button title={'Post Comment'} onPress={handleSubmit}></Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    textAlign: 'center',
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});

export default CommentForm;
