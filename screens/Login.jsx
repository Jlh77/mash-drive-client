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
import { useAuth } from "../contexts/User";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Also should use an error state and stuff
  const { login } = useAuth();

  const loginUser = async () => {
    if (email === "") {
      alert("Please enter an email");
    } else {
      setIsLoading(true);

      try {
        setIsLoading(true);
        await login(email, password).then(() => {
          // turns out we were trying to navigate when home didnt exist yet
          // navigation.navigate("Home");
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
      <View style={{ marginTop: 200 }}>
        <View style={{ alignItems: "center", marginBottom: 15 }}>
          <Text
            style={{ fontWeight: "bold", fontSize: 40, alignItems: "center" }}
          >
            Sign In
          </Text>
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={"Email"}
            value={email}
            onChangeText={setEmail}
          ></TextInput>
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={"Password"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          ></TextInput>
        </View>
        <View style={styles.button}>
          <Button title="Login" color="#6e9176" onPress={loginUser}></Button>
        </View>
        <View>
          <Text
            style={styles.forgotPassword}
            onPress={() => {
              navigation.navigate("ForgotPassword");
            }}
          >
            Forgot Password?
          </Text>
        </View>
        <View>
          <Text>New to Mash Drive? Click Register below</Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: "#F5D349",
  },
  forgotPassword: {
    color: "#5555ff",
    marginTop: 30,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    height: 40,
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
