import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator, 
} from 'react-native';
import { useEffect, useState } from 'react';
import { db } from '../firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { fetchUserByUid } from '../utils/utils';

const Leaderboard = ({ navigation }) => {
  const postsRef = collection(db, 'posts');
  const usersRef = collection(db, 'users');
  const [topTen, setTopTen] = useState([]);
  const [topTenUsers, setTopTenUsers] = useState([]);
  // add top ten most commented
  const [usersOrPosts, setUsersOrPosts] = useState('posts');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleTop();
  }, []);
  
  const handleTop = () => {
    console.log(topTen, 'top')
    getDocs(postsRef)
      .then((snapshot) => {
        let topRecipes = [];
        snapshot.docs.forEach((doc) => {
          const postData = { ...doc.data(), id: doc.id }
          fetchUserByUid(postData.uid).then((res) => {
            postData.username = res.username;
            postData.userReputation = res.reputation
          })
          topRecipes.push(postData);
        });
        topRecipes.sort((a, b) => {
          return parseInt(b.votes) - parseInt(a.votes);
        });
        topRecipes = topRecipes.slice(0, 9);
        setTopTen(topRecipes);
        setUsersOrPosts('posts');
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBottom = () => {
    console.log(topTen, 'bottom')
    setIsLoading(true);
    getDocs(postsRef)
      .then((snapshot) => {
        let topRecipes = [];
        snapshot.docs.forEach((doc) => {
          const postData = { ...doc.data(), id: doc.id }
          fetchUserByUid(postData.uid).then((res) => {
            postData.username = res.username;
            postData.userReputation = res.reputation
          })
          topRecipes.push(postData);
        });
        topRecipes.sort((a, b) => {
          return parseInt(a.votes) - parseInt(b.votes);
        });
        topRecipes = topRecipes.slice(0, 9);
        setTopTen(topRecipes);
        setUsersOrPosts('posts');
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUsers = () => {
    setIsLoading(true);
    getDocs(usersRef)
      .then((snapshot) => {
        let topUsers = [];
        snapshot.docs.forEach((doc) => {
          topUsers.push({ ...doc.data(), id: doc.id });
        });
        topUsers.sort((a, b) => {
          return parseInt(b.reputation) - parseInt(a.reputation);
        });
        topUsers = topUsers.slice(0, 9);
        setTopTenUsers(topUsers);
        setUsersOrPosts('users');
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    <View style={styles.preloader}>
      <ActivityIndicator size='large'></ActivityIndicator>
    </View>;
  }

  if (usersOrPosts === 'posts') {
    return (
      <SafeAreaView>
        <Text>Leaderboard Page</Text>
        <Button title='Top 10 Recipes' onPress={handleTop}></Button>
        <Button title='Bottom 10 Recipes' onPress={handleBottom}></Button>
        <Button title='Higest Rated Users' onPress={handleUsers}></Button>
        <View>
          <ScrollView style={styles.container}>
            {topTen.map((recipe, index) => {
              return (
                <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate( 'Post', { id: recipe.id })}>
                  <Text>{index + 1}</Text>
                    <Text>{recipe.title}</Text>
                  <Text>Votes: {recipe.votes}</Text>
                    <Text>
                      By:{recipe.username} -- Rep: {recipe.userReputation}
                    </Text>
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
      <SafeAreaView>
        <Text>Top Rated Users</Text>
        <Button title='Top 10 Recipes' onPress={handleTop}></Button>
        <Button title='Bottom 10 Recipes' onPress={handleBottom}></Button>
        <Button title='Higest Rated Users' onPress={handleUsers}></Button>
        <View>
          <ScrollView style={styles.container}>
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
  container: {
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
