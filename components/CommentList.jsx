import { View, Text, StyleSheet } from "react-native";
import DeleteCommentButton from "./DeleteCommentButton";

const CommentList = ({ commentData, setCommentData }) => {
  return (
    <View style={styles.commentsSection}>
      <Text style={styles.commentsHeader}>Comments</Text>
      {commentData.reverse().map((comment) => {
        return (
          <View style={styles.commentsBlock} key={comment.id}>
            {/* <Text>Comment by {comment.username}</Text> */}
            {/* <Text>Reputation: </Text> */}
            <Text style={styles.body}>'{comment.text_body}'</Text>
            <Text style={styles.username}>- {comment.username}</Text>
            <DeleteCommentButton
              style={{ color: "black" }}
              commenterUid={comment.uid}
              commentId={comment.id}
              setCommentData={setCommentData}
              postId={comment.post_id}
            >
              Hi
            </DeleteCommentButton>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  commentsBlock: {
    textAlign: "center",
    margin: 10,
  },
  commentsSection: {
    padding: 20,
    fontSize: 15,
    marginTop: 0,
    textTransform: "capitalize",
  },
  commentsHeader: {
    textAlign: "center",
    fontSize: 25,
  },
  body: {
    fontSize: 15,
  },

  deleteButton: {
    maxWidth: 10,
    maxHeight: 10,
  },
});

export default CommentList;
