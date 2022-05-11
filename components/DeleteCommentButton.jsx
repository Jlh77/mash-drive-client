import { useAuth } from '../contexts/User'
import { useState } from 'react'
import { Button, Alert, StyleSheet } from 'react-native'
import { deleteComment } from '../controllers/index'

const DeleteCommentButton = ({ commenterUid, commentId, setCommentData, postId }) => {
const { currentUser } = useAuth()

const handleDelete = (comment_id, post_id, user_uid) => {
    Alert.alert(
        "Delete Comment",
        "Are You Sure?",
        [
          {
            text: "Delete",
            onPress: () => {
                setCommentData((curr) => {
                    return curr.filter(x => x.id !== comment_id)
                })
                deleteComment(comment_id, post_id, user_uid);
            }
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          }
        ]
      )
}

if(currentUser.uid !== commenterUid || !commentId) return null;

return <Button color='#6e9176'  title="X" onPress={() => handleDelete(commentId, postId, commenterUid)}></Button>

}

const styles = StyleSheet.create({
deleteButton: {
  width: 10,
  height: 11,
  backgroundColor: '#6e9176'
}
  });

export default DeleteCommentButton;