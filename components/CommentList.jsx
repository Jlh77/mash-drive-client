import { View, Text, StyleSheet } from 'react-native';

const CommentList = ({ commentData }) => {
    return (
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
    )
}

const styles = StyleSheet.create({
    commentsSection: {
      padding: 20,
      fontSize: 15,
      marginTop: 5,
      textTransform: 'capitalize',
      borderWidth: 1,
      backgroundColor: 'beige',
    },
    commentsHeader : {
      textAlign: 'center',
      fontSize: 25,
    },
  });

export default CommentList;