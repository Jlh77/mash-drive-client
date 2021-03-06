import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import {
  getCommentsByPostId,
  fetchPostByPostId,
  fetchUserByUid,
} from "../utils/utils";
import { ScrollView } from "react-native-gesture-handler";
import CommentForm from "../components/CommentForm";
import { CommentList } from "../components";
import UpDownVoteButtons from "../components/UpDownVoteButtons";
const postImgPlaceholder = require("../img/defaultImage.jpeg");

const Post = ({ route, navigation }) => {
  const { id } = route.params;
  const [postData, setPostData] = useState({});
  const [commentData, setCommentData] = useState([]);
  const [postAuthorData, setPostAuthorData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInfo(id);
  }, [setCommentData]);

  const loadInfo = async (id) => {
    console.log(commentData, "<====== DATA");
    try {
      const post = await fetchPostByPostId(id);
      const author = await fetchUserByUid(post.uid);
      const comments = await getCommentsByPostId(id);
      setPostData(post);
      setPostAuthorData(author);
      setCommentData(comments);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    <View style={styles.preloader}>
      <ActivityIndicator size="large"></ActivityIndicator>
    </View>;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <View style={styles.poster}>
          <Image
            defaultSource={require("../img/default_avatar.jpeg")}
            style={styles.authorAvatar}
            source={{
              uri: postAuthorData.avatar_url,
            }}
          ></Image>
          <Text style={styles.poster_username}>{postAuthorData.username}</Text>
        </View>
        <View style={styles.mainPostArea}>
          <View style={styles.postSolo}>
            <Text style={styles.headerTitle}>{postData.title}</Text>
            <View style={{ alignItems: "center" }}>
              <Image
                style={styles.image}
                source={{
                  uri: postData.image_url
                    ? postData.image_url
                    : postImgPlaceholder,
                }}
              ></Image>

              <Text>{postData.description}</Text>
              <UpDownVoteButtons postData={postData} />
            </View>

            <View style={styles.commentForm}>
              <CommentForm
                postId={postData.id}
                setCommentData={setCommentData}
              />
            </View>
            <View style={styles.comments}>
              <CommentList
                commentData={commentData}
                setCommentData={setCommentData}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Post;

const styles = StyleSheet.create({
  poster: {
    backgroundColor: "rgb(27, 36, 42)",
    justifyContent: "center",
    alignItems: "center",
  },
  poster_username: {
    color: "#F5D349",
    textAlign: "center",

    // fontFamily: '"Times New Roman", Times, serif',
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 8,
    marginBottom: 8,
  },
  postSolo: {
    backgroundColor: "#F5D349",
  },
  safeAreaView: {
    backgroundColor: "#6e9176",
    flex: 1,
    borderColor: "black",
    borderStyle: "solid",
  },
  mainPostArea: {
    // borderWidth: 4,
    justifyContent: "center",
    borderColor: "black",
    borderStyle: "solid",
    borderTopWidth: 1,
  },
  headerTitle: {
    textTransform: "capitalize",
    textAlign: "center",
    fontSize: 30,
    marginTop: 8,
    marginBottom: 8,
    fontWeight: "bold",
  },
  image: {
    height: 200,
    width: 200,
    justifyContent: "center",
    height: 400,
    width: 400,
    justifyContent: "center",
  },
  authorAvatar: {
    width: 100,
    height: 100,
    borderRadius: 1000,
    alignItems: "center",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
  },
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  comments: {
    backgroundColor: "#6e9176",
    borderColor: "black",
    borderStyle: "solid",
    borderTopWidth: 1,
  },

  commentForm: {
    backgroundColor: "#F5D349",
    borderColor: "black",
    borderStyle: "solid",
  },
});
