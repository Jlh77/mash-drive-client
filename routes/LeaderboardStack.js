import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Account, Gallery, Home, Leaderboard, Login, Post, Register, Upload, User } from '../screens/index';


const LeaderboardStack = createStackNavigator({
    Leaderboard: {
        screen: Leaderboard
    },
    Home: {
        screen: Home
    },
    Account: {
        screen: Account
    },
    Gallery: {
        screen: Gallery
    },
   Login: {
        screen:Login
    },
    Post: {
        screen: Post
    },
    Register: {
        screen: Register
    },
    Upload: {
        screen: Upload
    },
    User: {
        screen: User
    },
    
})

export default createAppContainer(LeaderboardStack)