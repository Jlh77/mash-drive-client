import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "react-navigation";
import {
  Account,
  Gallery,
  Home,
  Leaderboard,
  Login,
  Post,
  Register,
  Upload,
  User,
} from "../screens/index";
import { useAuth } from "../contexts/User";

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  const { currentUser } = useAuth();
  return currentUser ? (
    <>
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Account" component={Account} />
      <HomeStack.Screen name="Post" component={Post} />
      <HomeStack.Screen name="User" component={User} />
      </HomeStack.Navigator>
    </>
  ) : (
    <>
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Login" component={Login} />
      <HomeStack.Screen name="Register" component={Register} />
      </HomeStack.Navigator>
    </>
  );

  /* return (
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
  ) */
}

export default HomeStackScreen;
