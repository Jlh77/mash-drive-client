import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useEffect, useState } from 'react';
import { db } from '../firebase.config';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Link } from '@react-navigation/native';

const Leaderboard = ({ navigation }) => {
  const recipeRef = collection(db, 'recipes');
  const usersRef = collection(db, 'users');
  const [topTen, setTopTen] = useState([]);
  const [topTenUsers, setTopTenUsers] = useState([]);
  const [usersOrFood, setUsersOrFood] = useState('food');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleTop();
  }, []);

  const handleTop = () => {
    getDocs(recipeRef)
      .then((snapshot) => {
        let topRecipes = [];
        snapshot.docs.forEach((doc) => {
          topRecipes.push({ ...doc.data(), id: doc.id });
        });
        topRecipes.sort((a, b) => {
          return parseInt(b.votes) - parseInt(a.votes);
        });
        topRecipes = topRecipes.slice(0, 9);
        setTopTen(topRecipes);
        setUsersOrFood('food');
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBottom = () => {
    setIsLoading(true);
    getDocs(recipeRef)
      .then((snapshot) => {
        let topRecipes = [];
        snapshot.docs.forEach((doc) => {
          topRecipes.push({ ...doc.data(), id: doc.id });
        });
        topRecipes.sort((a, b) => {
          return parseInt(a.votes) - parseInt(b.votes);
        });
        topRecipes = topRecipes.slice(0, 9);
        setTopTen(topRecipes);
        setUsersOrFood('food');
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
        setUsersOrFood('users');
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

  if (usersOrFood === 'food') {
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
                <View key={index} style={styles.item}>
                  <Text>{index + 1}</Text>
                  <Link to={{ screen: 'Post', params: { id: recipe.id } }}>
                    <Text>{recipe.name}</Text>
                  </Link>

                  {/* FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
                  <Link to={{ screen: 'User', params: {} }}>
                    <Text>
                      By:{} -- Rep: {}
                    </Text>
                  </Link>

                  <Text>Votes: {recipe.votes}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  if (usersOrFood === 'users') {
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
