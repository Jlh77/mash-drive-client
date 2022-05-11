import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator, 
  LogBox, 
  TouchableOpacity
} from 'react-native';
import { useEffect, useState } from 'react';
import { db } from '../firebase.config';
import { collection } from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchUserByUid, getTopTenVotedPosts, getBottomTenVotedPosts, getTopTenUsers, getTenMostCommentedPosts } from '../utils/utils';

// everything online said use this to ignore yellow timeout messages, but maybe look into this deeper if there are problems
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const Leaderboard = ({ navigation }) => {
  const [topTen, setTopTen] = useState([]);
  const [topTenUsers, setTopTenUsers] = useState([]);
  const [usersOrPosts, setUsersOrPosts] = useState('posts');
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('Most Upvoted')

  useEffect(() => {
    handleTop();
  }, []);
  
  const handleTop = async () => {
    try {
      setIsLoading(true);
      setTitle('Most Upvoted')
      const fetchedTopTen = await getTopTenVotedPosts();
      for (const post of fetchedTopTen) {
        const userdata = await fetchUserByUid(post.uid);
        post.username = userdata.username;
        post.user_reputation = userdata.reputation;
      }
      setTopTen(fetchedTopTen);
      setUsersOrPosts('posts');
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBottom = async () => {
    try {
      setIsLoading(true);
      setTitle('Most Downvoted')
      const fetchedTopTen = await getBottomTenVotedPosts();
      for (const post of fetchedTopTen) {
        const userdata = await fetchUserByUid(post.uid);
        post.username = userdata.username;
        post.user_reputation = userdata.reputation;
      }
      setTopTen(fetchedTopTen);
      setUsersOrPosts('posts');
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUsers = async () => {
    try{
      setIsLoading(true);
      const fetchedTopUsers = await getTopTenUsers();
      setTopTenUsers(fetchedTopUsers);
        setUsersOrPosts('users');
        setIsLoading(false);
    } catch (err) {
      console.log(err)
    }
  };

  const handleComments = async () => {
    try {
      setIsLoading(true);
      setTitle('Most Commented')
      const fetchedTopTen = await getTenMostCommentedPosts();
      for (const post of fetchedTopTen) {
        const userdata = await fetchUserByUid(post.uid);
        post.username = userdata.username;
        post.user_reputation = userdata.reputation;
      }
      setTopTen(fetchedTopTen);
      setUsersOrPosts('posts');
      setIsLoading(false);
    } catch (err) {
      console.log(err)
    }
  }

  if (isLoading) {
    <View style={styles.preloader}>
      <ActivityIndicator size='large'></ActivityIndicator>
    </View>;
  }

  if (usersOrPosts === 'posts') {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.buttonArea}>
        <Button style={styles.selector} title='Most Upvotes' onPress={handleTop}></Button>
        <Button style={styles.selector} title='Most Downvotes' onPress={handleBottom}></Button>
        <Button style={styles.selector} title='Most Commented' onPress={handleComments}></Button>
        <Button style={styles.selector} title='Higest Rated Users' onPress={handleUsers}></Button>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView style={styles.scroller}>
            {topTen.map((recipe, index) => {
              return (
                <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate( 'Post', { id: recipe.id })}>
                  <Text style={styles.number}>{index + 1}</Text>
                    <Text>{recipe.title}</Text>
                  <Text>Votes: {recipe.upvotes - recipe.downvotes}</Text>
                  <Text>Comments: {recipe.comments}</Text>
                    <Text>By:{recipe.username}</Text>
                    {/* <Text>Rep: {recipe.userReputation}</Text> */}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  if (usersOrPosts === 'users') {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <Text style={styles.title}>Top Rated Users</Text>
        <View style={styles.buttonArea}>
        <Button style={styles.selector} title='Most Upvotes' onPress={handleTop}></Button>
        <Button style={styles.selector} title='Most Downvotes' onPress={handleBottom}></Button>
        <Button style={styles.selector} title='Most Commented' onPress={handleComments}></Button>
        <Button style={styles.selector} title='Higest Rated Users' onPress={handleUsers}></Button>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView style={styles.scroller}>
            {topTenUsers.map((user, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.item}
                  onPress={() =>
                    navigation.navigate('User', { userId: user.id })
                  }
                >
                  <Text>{index + 1}</Text>
                  <Text>{user.username}</Text>
                  <Text>Reputation: {user.reputation}</Text>
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
    fontSize: 40,
    fontWeight: "bold",
    backgroundColor: "#1B2424A"
  },
  buttonArea: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-evenly",
    marginBottom: 20,
    marginTop: 20,
  },  
  screenContainer: {
    flex: 1,
    backgroundColor: '#F5D349',
  },
  scrollContainer: {
    flex: 1,
  },
  scroller: {
    flexGrow: 1,
    padding: 50,
  },
  item: {
    padding: 20,
    fontSize: 15,
    textTransform: 'capitalize',
    borderWidth: 2,
    borderRadius: 6,
  },
  number: {
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },  
});

export default Leaderboard;
