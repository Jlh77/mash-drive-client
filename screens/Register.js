import { useState } from "react";
import {
  TextInput,
  ScrollView,
  View,
  StyleSheet,
  Button,
  Text,
  ActivityIndicator,
} from "react-native";
import { db } from "../firebase.config";
import { useAuth } from "../contexts/User";
import { NavigationActions } from "react-navigation";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Should probably have an error state, currently uses alerts
  const { register } = useAuth();

  const storeUser = async () => {
    if (username === "") {
      alert("Please enter a username");
    } else if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      alert("Please enter a valid email address");
    } else if (password.length < 6) {
      alert("Please enter a password at least 6 characters long");
    } else {
      setIsLoading(true);

      try {
        setIsLoading(true);
        await register(email, password, username).then(() => {
          navigation.navigate("Home");
        });
      } catch (err) {
        alert(`Error: ${err}`);
      }

      setIsLoading(false);
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
      <View style={{alignItems: 'center', marginBottom: 15}}>
      <Text style={{ fontWeight: "bold", fontSize: 40 }}>Register</Text>
      </View>
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
        <Button title="Sign Up" color='#6e9176' onPress={storeUser}></Button>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: '#F5D349'
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: 'white'
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
