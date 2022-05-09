import {
  doc,
  docs,
  collection,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { configureProps } from "react-native-reanimated/lib/reanimated2/core";
import { db, firebased } from "../firebase.config";

export const fetchPostByPostId = async (postId) => {
  try {
    const postRef = db.collection("posts").doc(postId);
    const post = await postRef.get();
    if (!post) {
      Promise.reject({ status: 404, msg: "Not Found" });
    } else {
      const result = await { ...post.data(), id: post.id };
      return result;
    }
  } catch (err) {
    console.log(err);
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
    const postsRef = db.collection("posts");
    const postsByUser = await postsRef.where("uid", "==", uid).get();
    let arr = [];
    postsByUser.docs.forEach((doc) => {
      arr.push(doc.data());
    });
    return arr;
  } catch (err) {
    console.log(err);
  }
};

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
    const commentsRef = db.collection("comments").docs(postId);
    const comments = await commentsRef.get();
    let arr = [];
    comments.docs.forEach((doc) => {
      arr.push(doc.data());
    });
    return arr;
  } catch (err) {
    console.log(err);
  }
};

export const getTenMostCommentedPosts = async () => {
  try {
    const postsRef = db.collection("posts");
    const topTenMostCommented = await postsRef
      .orderBy("comments", "desc")
      .limit(10)
      .get();
    let arr = [];
    topTenMostCommented.docs.forEach((post) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    return arr;
  } catch (err) {
    console.log(err);
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
      arr.push(user.data());
    });
    return arr;
  } catch (err) {
    console.log(err);
  }
};

export const upvotePost = async (currentUser, post_id) => {
  if (!currentUser) {
    //some error logic
    alert("You must be logged in to vote on a post.");
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
              upvotes: firebased.firestore.FieldValue.increment(-1),
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
              downvotes: firebased.firestore.FieldValue.increment(-1),
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
            upvotes: firebased.firestore.FieldValue.increment(1),
          });
      });
  });
};

export const downvotePost = async (currentUser, post_id) => {
  if (!currentUser) {
    //some error logic
    alert("You must be logged in to vote on a post.");
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
              downvotes: firebased.firestore.FieldValue.increment(-1),
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
              upvotes: firebased.firestore.FieldValue.increment(-1),
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
            downvote: firebased.firestore.FieldValue.increment(1),
          });
      });
  });
};
