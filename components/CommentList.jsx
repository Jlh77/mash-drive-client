import { View, Text, StyleSheet } from 'react-native';

const CommentList = ({ commentData }) => {
    return (
        <View style={styles.commentsSection}>
            <Text style={styles.commentsHeader}>Comments</Text>
            {commentData.map((comment) => {
            return (
                <View style={styles.commentsBlock} key={comment.id}>
                {/* <Text>Comment by {comment.username}</Text> */}
                {/* <Text>Reputation: </Text> */}
                <Text style={styles.body}>'{comment.text_body}'</Text>
                <Text style={styles.username}>- {comment.username}</Text>
                </View>
            );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
  commentsBlock: {
    textAlign: 'center',
margin: 10
  },
    commentsSection: {
      padding: 20,
      fontSize: 15,
      marginTop: 0,
      textTransform: 'capitalize',


    },
    commentsHeader : {
      textAlign: 'center',
      fontSize: 25,
    },
    body: {
      fontSize: 15
    }
  });

export default CommentList;