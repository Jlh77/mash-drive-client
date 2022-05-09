import { doc, docs, collection, query, where, orderBy, limit, connectFirestoreEmulator, set, add, update, FieldValue } from 'firebase/firestore'
import { db, firebased } from '../firebase.config'




export const fetchPostByPostId = async (postId) => {
    try {
        const postRef = db.collection('posts').doc(postId);
        const post = await postRef.get();
        if (!post) {
            Promise.reject({status: 404, msg: 'Not Found'})
        } else {
            const result = await {...post.data(), id: post.id}
            return result;
        }
    } catch (err) {
        console.log(err)
    }
}

export const fetchUserByUid =  async (uid) => {
    try {
        const userRef = db.collection('users').doc(uid);
        const user = await userRef.get()
        if (!user) {
            Promise.reject({status: 404, msg: 'Not Found'})
        } else {
            return user.data();
        }
    } catch (err) {
        console.log(err)
      }
}

export const fetchPostsByUid = async (uid) => {
    try {
        const postsRef = db.collection('posts')
        const postsByUser = await postsRef.where('uid', '==', uid).get();
        let arr = [];
        postsByUser.docs.forEach(doc => {
            console.log(doc, 'doc')
            arr.push(doc.data());
        })
        return arr;
    } catch (err) {
        console.log(err)
    }
}

export const getTopTenVotedPosts = async () => {
    try {
        const postsRef = db.collection('posts')
        const topTenVoted = await postsRef.orderBy('votes', 'desc').limit(10).get();
        let arr = [];
        topTenVoted.docs.forEach(doc => {
            arr.push({...doc.data(), id: doc.id})
        })
        return arr;
    } catch (err) {
        console.log(err)
    }
}

export const getBottomTenVotedPosts = async () => {
    try {
        const postsRef = db.collection('posts')
        const topTenVoted = await postsRef.orderBy('votes').limit(10).get();
        let arr = [];
        topTenVoted.docs.forEach(doc => {
            arr.push({...doc.data(), id: doc.id})
        })
        return arr;
    } catch (err) {
        console.log(err)
    }
}

export const getCommentsByPostId = async (postId) => {
    try {
        
        const commentsRef = db.collection('comments')
        const comments = await commentsRef.where('post_id', '==', postId) .get();
        let arr = [];
        comments.docs.forEach(doc => {
            arr.push({...doc.data(), id: doc.id})
        })
        return arr;
    } catch (err) {
        console.log(err);
    }
}

export const getTenMostCommentedPosts = async () => {
    try {
        const postsRef = db.collection('posts');
        const topTenMostCommented = await postsRef.orderBy('comments', 'desc').limit(10).get();
        let arr = [];
        topTenMostCommented.docs.forEach(doc => {
            arr.push({...doc.data(), id: doc.id})
        })
        console.log(arr, 'arr of top10comments')
        return arr;
    } catch (err) {
        console.log(err)
    }
}

export const getTopTenUsers = async () => {
    try{
        const usersRef = db.collection('users')
        const topTenReputation = await usersRef.orderBy('reputation', 'desc').limit(10).get();
        let arr = [];
        topTenReputation.docs.forEach(user => {
            arr.push(user.data())
        })
        return arr;
    } catch (err) {
        console.log(err)
    }
}

export const submitComment = async (comment, commentersUid) => {
    try {
        const res = await db.collection('comments').add(comment);

        // add comment to users 
        //res.id
        return res;
    } catch (err) {
        console.log(err)
    }
}

export const incrementCommentCount = async (post_id) => {
    try {
        const postsRef = db.collection('posts').doc(post_id)
        const res = await postsRef.update({comments: firebased.firestore.FieldValue.increment(1)})
        return res;
    } catch (err) {
        console.log(err)
    }
}