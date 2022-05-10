import { collection, doc } from 'firebase/firestore';
import { db } from '../firebase.config'

const removeCommentById = async (comment_id) => {
    try {
        const res = await db.collection('comments').doc(comment_id).delete();
        return res;
    } catch (err) {
        console.log(err)
    }
}

export default removeCommentById;