import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { UserProvider } from "./contexts/User";
import ForgotPassword from "./screens/ForgotPassword";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";

export default function App() {
  return (
    <UserProvider>
      <Register></Register>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
