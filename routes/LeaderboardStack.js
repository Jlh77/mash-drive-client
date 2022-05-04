import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from 'react-navigation';
import { Account, Gallery, Home, Leaderboard, Login, Post, Register, Upload, User } from '../screens/index';

const LeaderboardStack = createStackNavigator();

function LeaderboardStackScreen() {
  return (
    <LeaderboardStack.Navigator headerMode="none">
        <LeaderboardStack.Screen name="Leaderboard" component={Leaderboard} />
        <LeaderboardStack.Screen name="Home" component={Home} />
        <LeaderboardStack.Screen name="Account" component={Account} />
        <LeaderboardStack.Screen name="Gallery" component={Gallery} />
        <LeaderboardStack.Screen name="Login" component={Login} />
        <LeaderboardStack.Screen name="Post" component={Post} />
        <LeaderboardStack.Screen name="Register" component={Register} />
        <LeaderboardStack.Screen name="Upload" component={Upload} />
        <LeaderboardStack.Screen name="User" component={User} />
    </LeaderboardStack.Navigator>
  )
}

export default LeaderboardStackScreen;