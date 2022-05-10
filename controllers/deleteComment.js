import { decrementCommentCount, removeCommentById, removeCommentIdFromUsersArrayOfCommentIds } from '../models/index'

const deleteComment = async (comment_id, post_id, user_uid) => {
    try {
      //delete comment doc
      const res = await removeCommentById(comment_id)
  
      //decrement comment count
      const res2 = await decrementCommentCount(post_id)
  
      //remove from users array_of_comment_ids
      const res3 = await removeCommentIdFromUsersArrayOfCommentIds(user_uid, comment_id)
      
    } catch (err) {
      console.log(err)
    }
  }

  export default deleteComment;