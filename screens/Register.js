import { useState } from "react";
import { TextInput, ScrollView, View, StyleSheet, Button } from "react-native";
import { ActivityIndicator } from "react-native-web";
import firebase from "./firebase.config";

const Register = ({ navigation }) => {
  const [dbRef, setDbRef] = useState(firebase.firestore().collection("users"));
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const storeUser = () => {
    if (username === "") {
      alert("Please enter a username");
    } else if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      alert("Please enter an email");
    } else if (password.length < 6) {
      alert("Please enter a password at least 6 characters long");
    } else {
      setIsLoading(true);
      dbRef
        .add({
          username,
          email,
        })
        .then((res) => {
          setUsername("");
          setEmail("");
          setPassword("");
          setIsLoading(false);
          navigation.navigate("Account");
        })
        .catch((err) => {
          console.log("ERRR>>>>>>>>>>", err);
          setIsLoading(false);
          alert("Something went very very wrong");
        });
    }
  };

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
          placeholder={"email"}
          value={email}
          onChangeText={setEmail}
        ></TextInput>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder={"password"}
          value={password}
          onChangeText={setPassword}
        ></TextInput>
      </View>
      <View>
        <Button
          title="Sign Up"
          onPress={() => {
            console.log("here");
            storeUser();
          }}
        ></Button>
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
export default Register;
