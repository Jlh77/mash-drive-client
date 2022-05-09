import { View, Text, ScrollView, StyleSheet, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../contexts/User';
import { submitComment, incrementCommentCount } from '../utils/utils';

const CommentForm = ({ navigation, postId, setCommentData }) => {
  const [commentBody, setCommentBody] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async () => {
      if (commentBody === "") {
          alert("Please Enter a comment")
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
        return ([...curr, commentToSubmit])
    })

    try {
        //post to comment collection
        console.log(currentUser.uid, 'uid')
        const res = await submitComment(commentToSubmit);
        
        //increment posts comment count  
        const inc = await incrementCommentCount(postId);

        // add comment to users comments array


    } catch (err) {
        
    }
    //make form text input empty
    setCommentBody('')
    setDisabled(false);
}
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
          <Button disabled={disabled} title={'Post Comment'} onPress={handleSubmit}></Button>
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
