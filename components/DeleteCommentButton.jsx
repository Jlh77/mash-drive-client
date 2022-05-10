import { useAuth } from '../contexts/User'
import { useState } from 'react'
import { Button, Alert } from 'react-native'
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

return <Button title="Delete Comment" onPress={() => handleDelete(commentId, postId, commenterUid)}></Button>

}

export default DeleteCommentButton;