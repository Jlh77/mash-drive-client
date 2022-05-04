import * as React from "react";
import { Button, LogoTitle, View, Text } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

import { Account, Gallery, Home, Leaderboard, Login, Post, Register, Upload, User } from './screens/index';
import { HomeStackScreen, LeaderboardStackScreen, UploadStackScreen } from './routes/index';

const Tab = createBottomTabNavigator();

function MyTabs() {
  
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardStackScreen} />
      <Tab.Screen name="Upload" component={UploadStackScreen} /> 
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
