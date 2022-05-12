import { useState } from "react";
import {
  TextInput,
  ScrollView,
  View,
  StyleSheet,
  Button,
  Text,
} from "react-native";
import { ActivityIndicator } from "react-native-web";
import { useAuth } from "../contexts/User";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Should probably have an error state, currently uses alerts
  const { currentUser, resetPassword } = useAuth();

  const handleForgotPassword = async () => {
    if (email === "") {
      alert(
        "Enter the email address of your account to receive a reset password link"
      );
    } else if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      alert("Please enter a valid email address");
    } else {
      setIsLoading(true);

      try {
        setIsLoading(true);
        await resetPassword(email);
        alert("Check your inbox to reset your password.");
        navigation.navigate("Login");
      } catch (err) {
        // IMPORRTANT broken: Firebase throws an error if there is no record, we don't want user to know if it exists or not, so we should do the same either way
        if (
          err ===
          "FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."
        ) {
          alert("Check your inbox to reset your password.");
          navigation.navigate("Login");
        } else {
          alert(`Failed to reset password. Please Try again: ${err}`);
        }
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
      <Text style={{ fontWeight: "bold", fontSize: 40 }}>Forgot Password</Text>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder={"email"}
          value={currentUser?.email || email}
          onChangeText={setEmail}
        ></TextInput>
      </View>
      <View>
        <Button title="Reset Password" onPress={handleForgotPassword}></Button>
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
export default ForgotPassword;
