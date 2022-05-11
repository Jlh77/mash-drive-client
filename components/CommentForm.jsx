import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../contexts/User';
import { submitComment, incrementCommentCount } from '../utils/utils';

const CommentForm = ({ navigation, postId, setCommentData }) => {
  const [commentBody, setCommentBody] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async () => {
    if (commentBody === '') {
      alert('Please Enter a comment');
    } else {
      setDisabled(true);
      //make comment object
      const commentToSubmit = {};
      commentToSubmit.username = currentUser.username;
      commentToSubmit.uid = currentUser.uid;
      commentToSubmit.post_id = postId;
      commentToSubmit.text_body = commentBody;
      commentToSubmit.votes = 0;

      //optimisticly render comments with new comment on top
      setCommentData((curr) => {
        const tempCopy = { ...commentToSubmit };

        //make random temp id number so mapped element has keys
       // tempCopy.id = Math.floor(Math.random() * 10000).toString();
       
        return [...curr, tempCopy];
      });

      try {
        //post to comment collection + add to users array_of_comment_ids
        const res = await submitComment(commentToSubmit, currentUser.uid);

        //increment posts comment count
        const inc = await incrementCommentCount(postId);
      } catch (err) {}
      //make form text input empty
      setCommentBody('');
      setDisabled(false);
    }
  };

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
    <ScrollView style={styles.commentsForm}>
      <Text>Logged in as {currentUser.username}</Text>
      <View>
        <TextInput
          style={styles.inputGroup}
          placeholder={'Leave A Comment'}
          value={commentBody}
          onChangeText={setCommentBody}
        ></TextInput>
      </View>
      <View style={styles.inputGroup}>
        <Button
          disabled={disabled}
          title={'Post Comment'}
          onPress={handleSubmit}
        ></Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  commentsForm: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
    textTransform: 'capitalize',

  },
  container: {
    flex: 1,
    padding: 35,
    textAlign: 'center',
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    backgroundColor: 'white',
borderWidth: 1,
borderColor: 'black',
borderStyle: 'solid',


  },
});

export default CommentForm;
