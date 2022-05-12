import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  LogBox,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  fetchUserByUid,
  getTopTenVotedPosts,
  getBottomTenVotedPosts,
  getTopTenUsers,
  getTenMostCommentedPosts,
} from "../utils/utils";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";

// everything online said use this to ignore yellow timeout messages, but maybe look into this deeper if there are problems
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

const Leaderboard = ({ navigation }) => {
  const [topTen, setTopTen] = useState([]);
  const [topTenUsers, setTopTenUsers] = useState([]);
  const [usersOrPosts, setUsersOrPosts] = useState("posts");
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("Most Upvoted");

  useEffect(() => {
    handleTop();
  }, []);

  const handleTop = async () => {
    try {
      setIsLoading(true);
      setTitle("Most Upvoted");
      const fetchedTopTen = await getTopTenVotedPosts();
      for (const post of fetchedTopTen) {
        const userdata = await fetchUserByUid(post.uid);
        post.username = userdata.username;
        post.user_reputation = userdata.reputation;
      }
      setTopTen(fetchedTopTen);
      setUsersOrPosts("posts");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBottom = async () => {
    try {
      setIsLoading(true);
      setTitle("Most Downvoted");
      const fetchedTopTen = await getBottomTenVotedPosts();
      for (const post of fetchedTopTen) {
        const userdata = await fetchUserByUid(post.uid);
        post.username = userdata.username;
        post.user_reputation = userdata.reputation;
      }
      setTopTen(fetchedTopTen);
      setUsersOrPosts("posts");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUsers = async () => {
    try {
      setIsLoading(true);
      const fetchedTopUsers = await getTopTenUsers();
      setTopTenUsers(fetchedTopUsers);
      setUsersOrPosts("users");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleComments = async () => {
    try {
      setIsLoading(true);
      setTitle("Most Commented");
      const fetchedTopTen = await getTenMostCommentedPosts();
      for (const post of fetchedTopTen) {
        const userdata = await fetchUserByUid(post.uid);
        post.username = userdata.username;
        post.user_reputation = userdata.reputation;
      }
      setTopTen(fetchedTopTen);
      setUsersOrPosts("posts");
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

  if (usersOrPosts === "posts") {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <View style={styles.headerArea}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.buttonArea}>
          <View style={styles.column1}>
            <Pressable style={styles.selector} onPress={handleTop}>
              <Text style={styles.pressableText}>Most Upvotes</Text>
            </Pressable>
            <Pressable style={styles.selector} onPress={handleBottom}>
              <Text style={styles.pressableText}>Most Downvotes</Text>
            </Pressable>
          </View>
          <View style={styles.column2}>
            <Pressable style={styles.selector} onPress={handleComments}>
              <Text style={styles.pressableText}>Most Commented</Text>
            </Pressable>
            <Pressable style={styles.selector} onPress={handleUsers}>
              <Text style={styles.pressableText}>Highest Rated User</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView style={styles.scroller}>
            {topTen.map((recipe, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.item}
                  onPress={() => navigation.navigate("Post", { id: recipe.id })}
                >
                  <Text style={styles.number}>{index + 1}</Text>
                  <Text style={styles.itemPostTitle}>{recipe.title}</Text>
                  <Text style={styles.by}>By:{recipe.username}</Text>
                  <View style={styles.votesAndComments}>
                    <Text style={styles.votesAndCommentsText}>
                      Votes: {recipe.upvotes - recipe.downvotes}
                    </Text>
                    <Text style={styles.votesAndCommentsText}>
                      Comments: {recipe.comments}
                    </Text>
                  </View>
                  {/* <Text>Rep: {recipe.userReputation}</Text> */}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  if (usersOrPosts === "users") {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <View style={styles.headerArea}>
          <Text style={styles.title}>Top Rated Users</Text>
        </View>
        <View style={styles.buttonArea}>
          <View style={styles.column1}>
            <Pressable style={styles.selector} onPress={handleTop}>
              <Text style={styles.pressableText}>Most Upvotes</Text>
            </Pressable>
            <Pressable style={styles.selector} onPress={handleBottom}>
              <Text style={styles.pressableText}>Most Downvotes</Text>
            </Pressable>
          </View>
          <View style={styles.column2}>
            <Pressable style={styles.selector} onPress={handleComments}>
              <Text style={styles.pressableText}>Most Commented</Text>
            </Pressable>
            <Pressable style={styles.selector} onPress={handleUsers}>
              <Text style={styles.pressableText}>Highest Rated User</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView style={styles.scroller}>
            {topTenUsers.map((user, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.item}
                  onPress={() =>
                    navigation.navigate("User", { userId: user.id })
                  }
                >
                  <Text style={styles.number}>{index + 1}</Text>
                  <Text style={styles.itemPostTitle}>{user.username}</Text>
                  <Text style={styles.reputation}>
                    Reputation: {user.reputation}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    margin: 15,
    fontSize: 25,
    fontWeight: "500",
    letterSpacing: 1,
    color: "#F5D349",
  },
  headerArea: {
    backgroundColor: "#1B242A",
    height: 60,
    justifyContent: "center",
  },
  buttonArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#F5D349",
  },
  scrollContainer: {
    flex: 1,
  },
  scroller: {
    flexGrow: 1,
    padding: 30,
  },
  item: {
    padding: 10,
    fontSize: 15,
    textTransform: "capitalize",
    borderWidth: 2,
    borderRadius: 6,
    marginBottom: 2,
    backgroundColor: "#1B242A",
  },
  itemPostTitle: {
    fontSize: 22,
    textAlign: "center",
    color: "#F5D349",
    fontWeight: "500",
    letterSpacing: 1,
  },
  votesAndComments: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 2,
  },
  votesAndCommentsText: {
    color: "white",
    fontWeight: "500",
    letterSpacing: 1,
  },
  by: {
    textAlign: "right",
    color: "#F5D349",
    fontWeight: "500",
    letterSpacing: 1,
    margin: 2,
    fontSize: 12,
  },
  reputation: {
    textAlign: "right",
    color: "white",
    fontWeight: "500",
    letterSpacing: 1,
    margin: 2,
    fontSize: 12,
  },
  pressableText: {
    //fontSize: 3 * vmin, this is giving NaN error, please fix
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "#F5D349",
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 1,
  },
  selector: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: "#885A2C",
    color: "#F5D349",
    width: "80%",
    height: "30%",
    marginLeft: "10%",
  },
  number: {
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
  column1: {
    width: "50%",
    justifyContent: "space-evenly",
  },
  column2: {
    width: "50%",
    justifyContent: "space-evenly",
  },
});

export default Leaderboard;
