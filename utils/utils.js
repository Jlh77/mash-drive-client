import { doc, docs, collection, query, where, orderBy, limit, set, add, update } from 'firebase/firestore'
import { db, firebased } from '../firebase.config'
import firebase from 'firebase/compat';




export const fetchPostByPostId = async (postId) => {
    try {
        const postRef = db.collection('posts').doc(postId);
        const post = await postRef.get();
        if (!post) {
            Promise.reject({status: 404, msg: 'Not Found'})
        } else {
            const result = {...post.data(), id: post.id}
            return result;
        }
    } catch (err) {
        console.log(err)
  }
};

export const fetchUserByUid = async (uid) => {
  try {
    const userRef = db.collection("users").doc(uid);
    const user = await userRef.get();
    if (!user) {
      Promise.reject({ status: 404, msg: "Not Found" });
    } else {
      return user.data();
    }
  } catch (err) {
    console.log(err);
  }
};

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
    const postsRef = db.collection("posts");
    const topTenVoted = await postsRef.orderBy("votes", "desc").limit(10).get();
    let arr = [];
    topTenVoted.docs.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    return arr;
  } catch (err) {
    console.log(err);
  }
};

export const getBottomTenVotedPosts = async () => {
  try {
    const postsRef = db.collection("posts");
    const topTenVoted = await postsRef.orderBy("votes").limit(10).get();
    let arr = [];
    topTenVoted.docs.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    return arr;
  } catch (err) {
    console.log(err);
  }
};

export const getCommentsByPostId = async (postId) => {
    try {
        
        const commentsRef = db.collection('comments')
        const comments = await commentsRef.where('post_id', '==', postId) .get();
        let arr = [];
        comments.docs.forEach(doc => {
            const comment = {...doc.data()}
            comment.id = doc.id
            arr.push(comment);
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
};

export const getTopTenUsers = async () => {
  try {
    const usersRef = db.collection("users");
    const topTenReputation = await usersRef
      .orderBy("reputation", "desc")
      .limit(10)
      .get();
    let arr = [];
    topTenReputation.docs.forEach((user) => {
      arr.push({...user.data(), id: user.id});
    });
    return arr;
  } catch (err) {
    console.log(err);
  }
};

export const upvotePost = async (currentUser, post_id) => {
  if (!currentUser) {
    //some error logic that MUST return
    return alert("You must be logged in to vote on a post.");
  }

  const user = db.collection("users").doc(currentUser.uid);

  return user.get().then((doc) => {
    if (doc.data().upvoted_posts.includes(post_id)) {
      // already votes, undo vote
      alert("temp undid vote");
      const newUpvotedPosts = doc
        .data()
        .upvoted_posts.filter((post) => post !== post_id);
      return user
        .update({
          upvoted_posts: [...newUpvotedPosts],
        })
        .then(() => {
          return db
            .collection("posts")
            .doc(post_id)
            .update({
              upvotes: FieldValue.increment(-1),
            });
        });
    } else if (doc.data().downvoted_posts.includes(post_id)) {
      alert("temp undid downvote, to voteu p");
      const newDownvotedPosts = doc
        .data()
        .downvoted_posts.filter((post) => post !== post_id);
      user
        .update({
          downvoted_posts: [...newDownvotedPosts],
        })
        .then(() => {
          db.collection("posts")
            .doc(post_id)
            .update({
              downvotes: FieldValue.increment(-1),
            });
        });
    }
    // do upvote
    return user
      .update({
        upvoted_posts: [...doc.data().upvoted_posts, post_id],
      })
      .then(() => {
        return db
          .collection("posts")
          .doc(post_id)
          .update({
            upvotes: FieldValue.increment(1),
          });
      });
  });
};

export const downvotePost = async (currentUser, post_id) => {
  if (!currentUser) {
    //some error logic MUST Return to exit func
    return alert("You must be logged in to vote on a post.");
  }

  const user = db.collection("users").doc(currentUser.uid);

  return user.get().then((doc) => {
    if (doc.data().downvoted_posts.includes(post_id)) {
      // already votes, undo vote
      alert("temp undid vote");
      const newDownvotedPosts = doc
        .data()
        .downvoted_posts.filter((post) => post !== post_id);
      return user
        .update({
          upvoted_posts: [...newDownvotedPosts],
        })
        .then(() => {
          return db
            .collection("posts")
            .doc(post_id)
            .update({
              downvotes: FieldValue.increment(-1),
            });
        });
    } else if (doc.data().upvoted_posts.includes(post_id)) {
      alert("temp undid downvote, to voteu p");
      const newUpvotedPosts = doc
        .data()
        .upvoted_posts.filter((post) => post !== post_id);
      user
        .update({
          upvoted_posts: [...newUpvotedPosts],
        })
        .then(() => {
          db.collection("posts")
            .doc(post_id)
            .update({
              upvotes: FieldValue.increment(-1),
            });
        });
    }
    // do downvote
    return user
      .update({
        downvoted_posts: [...doc.data().downvoted_posts, post_id],
      })
      .then(() => {
        return db
          .collection("posts")
          .doc(post_id)
          .update({
            downvote: FieldValue.increment(1),
          });
      });
  });
};

export const submitComment = async (comment, commentersUid) => {
    try {
        const res = await db.collection('comments').add(comment);

        // add comment to users 
        //res.id
        const updateUsersArrayOfCommentsRef = db.collection('users').doc(commentersUid);
        const unionRes = await updateUsersArrayOfCommentsRef.update({array_of_comment_ids: firebase.firestore.FieldValue.arrayUnion(res.id)})
        return res;
    } catch (err) {
        console.log(err)
    }
}

export const incrementCommentCount = async (post_id) => {
    try {
        const postsRef = db.collection('posts').doc(post_id)
        const res = await postsRef.update({comments: firebase.firestore.FieldValue.increment(1)})
        return res;
    } catch (err) {
        console.log(err)
    }
}

