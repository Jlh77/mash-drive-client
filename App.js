import * as React from "react";
import { Button, LogoTitle, View, Text } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { fetchUserByUid } from './utils/utils';
import { Ionicons } from "@expo/vector-icons";
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
} from "./screens/index";
import {
  HomeStackScreen,
  LeaderboardStackScreen,
  UploadStackScreen,
  ScreenStack
} from "./routes/index";
import { Navbar } from './components/index';
import { UserProvider } from "./contexts/User";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <ScreenStack/>
        <Navbar/>
      </NavigationContainer>
    </UserProvider>
  );
}
