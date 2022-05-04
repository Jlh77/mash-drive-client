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

const UploadStack = createStackNavigator();

function UploadStackScreen({ isSignedIn }) {
  const { currentUser } = useAuth();
  return currentUser ? (
    <>
      <UploadStack.Screen name="Post" component={Post} />
      <UploadStack.Screen name="Home" component={Home} />
      <UploadStack.Screen name="Account" component={Account} />
      <UploadStack.Screen name="User" component={User} />
    </>
  ) : (
    <>
      <UploadStack.Screen name="Login" component={Login} />
      <UploadStack.Screen name="Register" component={Register} />
    </>
  );

  /* return (
    <UploadStack.Navigator headerMode="none">
      <UploadStack.Screen name="Upload" component={Upload} />
      <UploadStack.Screen name="Home" component={Home} />
      <UploadStack.Screen name="Account" component={Account} />
      <UploadStack.Screen name="Gallery" component={Gallery} />
      <UploadStack.Screen name="Leaderboard" component={Leaderboard} />
      <UploadStack.Screen name="Login" component={Login} />
      <UploadStack.Screen name="Post" component={Post} />
      <UploadStack.Screen name="Register" component={Register} />
      <UploadStack.Screen name="User" component={User} />
    </UploadStack.Navigator>
  ) */
}

export default UploadStackScreen;
