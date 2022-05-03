import { useState } from "react";
import {
  ScrollView,
  View,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Button,
  Text,
} from "react-native";

const Account = ({ navigation }) => {
  const [username, setUsername] = useState("User");
  const [email, setEmail] = useState("test@test.com");
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {};

  if (isLoading)
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <Text>Hello, {username}</Text>
      <View style={styles.inputGroup}>
        <Text>Username:</Text>
        <TextInput value={username}></TextInput>
      </View>
      <View style={styles.inputGroup}>
        <Text>Email:</Text>
        <TextInput value={email}></TextInput>
      </View>
      <View>
        <Button title="Delete Account" onPress={handleDelete} color="#E37399" />
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
  button: {
    marginBottom: 7,
  },
});
=======
import { View, Text } from 'react-native';

const Account = () => {
  return (
    <View>
      <Text>Account Page</Text>
    </View>
  );
};
