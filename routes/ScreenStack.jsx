import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Account,
  ForgotPassword,
  Home,
  Leaderboard,
  Login,
  Post,
  Register,
  Upload,
  User,
} from "../screens/index";
import { useAuth } from "../contexts/User";

const Stack = createNativeStackNavigator();

function ScreenStack() {
  const { currentUser } = useAuth();
  return currentUser ? (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Upload"
        component={Upload}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default ScreenStack;
