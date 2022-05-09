import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator, 
  LogBox
} from 'react-native';
import { useEffect, useState } from 'react';
import { db } from '../firebase.config';
import { collection } from 'firebase/firestore';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { fetchUserByUid, getTopTenVotedPosts, getBottomTenVotedPosts, getTopTenUsers, getTenMostCommentedPosts } from '../utils/utils';

// everything online said use this to ignore yellow timeout messages, but maybe look into this deeper if there are problems
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const Leaderboard = ({ navigation }) => {
  const postsRef = collection(db, 'posts');
  const usersRef = collection(db, 'users');
  const [topTen, setTopTen] = useState([]);
  const [topTenUsers, setTopTenUsers] = useState([]);
  const [mostCommented, setMostCommented] = useState([]);
  const [usersOrPosts, setUsersOrPosts] = useState('posts');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleTop();
  }, []);
  
  const handleTop = async () => {
    try {
      setIsLoading(true);
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
      const fetchedTopTen = await getTenMostCommentedPosts();
      for (const post of fetchedTopTen) {
        const userdata = await fetchUserByUid(post.uid);
        post.username = userdata.username;
        post.user_reputation = userdata.reputation;
      }
      setMostCommented(fetchedTopTen);
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
        <Text>Top Posts</Text>
        <Button title='Top 10 Recipes' onPress={handleTop}></Button>
        <Button title='Bottom 10 Recipes' onPress={handleBottom}></Button>
        <Button title='Most Commented' onPress={handleComments}></Button>
        <Button title='Higest Rated Users' onPress={handleUsers}></Button>
        <View style={styles.scrollContainer}>
          <ScrollView style={styles.scroller}>
            {topTen.map((recipe, index) => {
              return (
                <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate( 'Post', { id: recipe.id })}>
                  <Text>{index + 1}</Text>
                    <Text>{recipe.title}</Text>
                  <Text>Votes: {recipe.votes}</Text>
                  <Text>Comments: {recipe.comments}</Text>
                    <Text>By:{recipe.username}</Text>
                    <Text>Rep: {recipe.userReputation}</Text>
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
        <Text>Top Rated Users</Text>
        <Button title='Top 10 Recipes' onPress={handleTop}></Button>
        <Button title='Bottom 10 Recipes' onPress={handleBottom}></Button>
        <Button title='Most Commented' onPress={handleComments}></Button>
        <Button title='Higest Rated Users' onPress={handleUsers}></Button>
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
  screenContainer: {
    flex: 1,
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
    marginTop: 5,
    textTransform: 'capitalize',
    borderWidth: 1,
    backgroundColor: 'beige',
  },
  
});

export default Leaderboard;
