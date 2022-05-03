import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Gallery from './screens/Gallery';
import Account from './screens/Account';
import Home from './screens/Home';
import Leaderboard from './screens/Leaderboard';
import Login from './screens/Login';
import Post from './screens/Post';
import Register from './screens/Register';
import Upload from './screens/Upload';
import User from './screens/User';

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#621FF7",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="Gallery"
        component={Gallery}
        options={{ title: "Gallery" }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{ title: "Account" }}
      />
      <Stack.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{ title: "Leaderboard" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={{ title: "Post" }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Register" }}
      />
      <Stack.Screen
        name="Upload"
        component={Upload}
        options={{ title: "Upload" }}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={{ title: "User" }}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}