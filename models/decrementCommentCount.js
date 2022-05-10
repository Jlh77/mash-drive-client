import { collection, doc, update } from 'firebase/firestore'
import firebase from 'firebase/compat'
import { db } from '../firebase.config'

const decrementCommentCount = async (post_id) => {
    try {
      const postsRef = db.collection('posts').doc(post_id)
      const res = await postsRef.update({comments: firebase.firestore.FieldValue.increment(-1)})
      return res;
    } catch (err) {
      console.log(err)
    }
  }

  export default decrementCommentCount;