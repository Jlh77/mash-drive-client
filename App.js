import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { UserProvider } from "./contexts/User";
import Home from "./screens/Home";
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
