import { useState } from "react";
import { TextInput, ScrollView, View, StyleSheet, Button } from "react-native";
import { ActivityIndicator } from "react-native-web";
import firebase from "./firebase.config";

const Login = ({ navigation }) => {
  const [dbRef, setDbRef] = useState(firebase.firestore().collection("users"));
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {};

  if (isLoading)
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder={"username"}
          value={username}
          onChangeText={setUsername}
        ></TextInput>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder={"password"}
          value={password}
          onChangeText={setPassword}
        ></TextInput>
      </View>
      <View style={styles.button}>
        <Button title="Login" onPress={loginUser}></Button>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Login;
