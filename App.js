import * as React from "react";
import { Button, LogoTitle, View, Text } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

import { Account, Gallery, Home, Leaderboard, Login, Post, Register, Upload, User } from './screens/index';
import { HomeStack, LeaderboardStack, UploadStack } from './routes/index';

const Tab = createBottomTabNavigator();

function MyTabs() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator>
      <HomeStack />
      <LeaderboardStack />
      <UploadStack />
    </Tab.Navigator>
  );
}
/* <Tab.Screen name="Home" component={HomeStackScreen} />
<Tab.Screen name="Leaderboard" component={LeaderboardStackScreen} />
<Tab.Screen name="Upload" component={UploadStackScreen} /> */


/* const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Account" component={Account} />
      <HomeStack.Screen name="Gallery" component={Gallery} />
      <HomeStack.Screen name="Leaderboard" component={Leaderboard} />
      <HomeStack.Screen name="Login" component={Login} />
      <HomeStack.Screen name="Post" component={Post} />
      <HomeStack.Screen name="Register" component={Register} />
      <HomeStack.Screen name="Upload" component={Upload} />
      <HomeStack.Screen name="User" component={User} />
    </HomeStack.Navigator>
  )
}

const LeaderboardStack = createStackNavigator();

function LeaderboardStackScreen() {
  return (
    <HomeStack.Navigator headerMode="none">
        <HomeStack.Screen name="Leaderboard" component={Leaderboard} />
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="Account" component={Account} />
        <HomeStack.Screen name="Gallery" component={Gallery} />
        <HomeStack.Screen name="Login" component={Login} />
        <HomeStack.Screen name="Post" component={Post} />
        <HomeStack.Screen name="Register" component={Register} />
        <HomeStack.Screen name="Upload" component={Upload} />
        <HomeStack.Screen name="User" component={User} />
    </HomeStack.Navigator>
  )
}

const UploadStack = createStackNavigator();

function UploadStackScreen() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Upload" component={Upload} />
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Account" component={Account} />
      <HomeStack.Screen name="Gallery" component={Gallery} />
      <HomeStack.Screen name="Leaderboard" component={Leaderboard} />
      <HomeStack.Screen name="Login" component={Login} />
      <HomeStack.Screen name="Post" component={Post} />
      <HomeStack.Screen name="Register" component={Register} />
      <HomeStack.Screen name="User" component={User} />
    </HomeStack.Navigator>
  )
} */

/* function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
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
        options={{
          headerTitle: "Home",
          headerLeft: () => (
            <Button
              onPress={() => navigation.navigate("Account")}
              title="👨"
              color="#fff"
              backgroundColor="#000"
            />
          ),
        }}
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
      <Stack.Screen name="Post" component={Post} options={{ title: "Post" }} />
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
      <Stack.Screen name="User" component={User} options={{ title: "User" }} />
    </Stack.Navigator>
  );
} */
export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
