import { doc, docs, collection, query, where, orderBy, limit } from 'firebase/firestore'
import { configureProps } from 'react-native-reanimated/lib/reanimated2/core';
import { db } from '../firebase.config'

export const fetchUserByUid =  async (uid) => {
    try {
        const userRef = db.collection('users').doc(uid);
        const user = await userRef.get()
        if (!user) {
            console.log('No user found with that id')
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
            arr.push(doc.data())
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
            arr.push(doc.data())
        })
        return arr;
    } catch (err) {
        console.log(err)
    }
}

export const getCommentsByPostId = async (postId) => {
    try {
        const commentsRef = db.collection('comments').docs(postId);
        const comments = await commentsRef.get();
        let arr = [];
        comments.docs.forEach(doc => {
            arr.push(doc.data())
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
        topTenMostCommented.docs.forEach(post => {
            arr.push(post.data())
        })
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