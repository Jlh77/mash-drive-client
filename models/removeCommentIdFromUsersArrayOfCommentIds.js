import { db } from '../firebase.config';
import firebase from 'firebase/compat'
import { collection, doc } from 'firebase/firestore'

const removeCommentIdFromUsersArrayOfCommentIds = async (user_uid, comment_id) => {
    try {
        const usersRef = db.collection('users').doc(user_uid)
        const res = await usersRef.update({
            array_of_comment_ids: firebase.firestore.FieldValue.arrayRemove(comment_id)
        })
        return res;
    } catch (err) {
        console.log(err)
    }
}

export default removeCommentIdFromUsersArrayOfCommentIds;