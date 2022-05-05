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
import { db } from "../firebase.config";
import { useAuth } from "../contexts/User";

const Upload = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Should probably have an error state, currently uses alerts

  const handleUpload = async () => {
    if (title === "") {
      alert("Please enter a valid title for your post");
    } else if (!image) {
      alert("Please upload an image of your post");
    } else {
      setIsLoading(true);

      try {
        setIsLoading(true);
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
      <Text style={{ fontWeight: "bold", fontSize: 40 }}>Upload</Text>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder={"Image"}
          value={title}
          onChangeText={setImage}
        ></TextInput>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder={"Description"}
          value={description}
          onChangeText={setDescription}
        ></TextInput>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder={"Title"}
          value={title}
          onChangeText={setTitle}
        ></TextInput>
      </View>

      <View>
        <Button title="Create Post" onPress={handleUpload}></Button>
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
export default Upload;
