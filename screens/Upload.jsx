import { useEffect, useState } from "react";
import {
  Animated,
  TextInput,
  ScrollView,
  View,
  StyleSheet,
  Button,
  Text,
  ActivityIndicator,
  Platform,
  Image,
} from "react-native";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";

import { db, storage } from "../firebase.config";
import { useAuth } from "../contexts/User";

const Upload = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // progress bar states
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  // Should probably have an error state, currently uses alerts
  const { currentUser } = useAuth();

  useEffect(async () => {
    // If mobile need to grab permission
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert(
          "Permission denied. Please allow Mash Drive to access your images."
        );
      }
    }
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) setImage(result);
  };

  const getBlobFromUri = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    return blob;
  };

  const handleUpload = async () => {
    if (title === "") {
      alert("Please enter a valid title for your post");
    } else if (!image) {
      alert("Please upload an image of your post");
    } else if (!currentUser) {
      // Checks if not logged in
      alert("You must log in to make a post to Mash Drive");
    } else {
      try {
        setIsUploading(true);
        // upload image to firebase storage
        const imgName = `img${currentUser.username}${new Date().getTime()}`;

        const storageRef = storage.ref(`images/${imgName}.jpg`);

        const metaData = { contentType: "image/jpeg" };

        const imageBlob = await getBlobFromUri(image.uri);

        const uploadTask = storageRef.put(imageBlob, metaData);

        // I need to add some things here to make loading bar update regularly
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.fround(
              parseFloat(snapshot.bytesTransferred / snapshot.totalBytes) * 100
            ).toFixed(2);
            setProgress(progress);
          },
          (error) => {
            // IMPORTANT add proper error message stuff here
            setIsUploading(false);
            setProgress(0);
            alert(`something went wrong check logs -> ${err}`);
          },
          () => {
            // at this point, upload successful, can return image url to do stuff, i set url in the new post
            storage
              .ref("images")
              .child(`${imgName}.jpg`)
              .getDownloadURL()
              .then((url) => {
                // add post data to collection and link image to post ***** add extra necessary fields here
                db.collection("posts").doc().set({
                  image_url: url,
                  title,
                  description,
                  uid: currentUser.uid,
                  upvotes: 0,
                  downvotes: 0,
                  parent_post_id: null,
                });

                setIsUploading(false);
                setProgress(0);

                // IMPORTANT Add logic here to tell user post was successful, clear the states to ""/null and maybe redirect to their new post/other page
              });
          }
        );
      } catch (err) {
        alert(`Error: ${err}`);
        // IMPORTANT Eventually error states used etc and for invalid input here too
      }
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

      <Button title="Choose Image" onPress={pickImage} />
      {/* Choose either this or below depending on ultimate styling preferences
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )} */}
      <Image
        // Choose a different placeholder below
        source={{ uri: image?.uri || "http://via.placeholder.com/200x200" }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputGroup}>
        <TextInput
          placeholder={"Title"}
          value={title}
          onChangeText={setTitle}
        ></TextInput>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder={"Description"}
          value={description}
          onChangeText={setDescription}
        ></TextInput>
      </View>

      <View>
        <Button title="Create Post" onPress={handleUpload}></Button>
      </View>

      <View>
        {isUploading && (
          <>
            <Text>Uploading your weird food...</Text>
            <View style={styles.progressBar}>
              <Animated.View
                style={
                  ([StyleSheet.absoluteFill],
                  { backgroundColor: "#8BED4F", width: Math.trunc(progress) })
                }
              />
            </View>
            <Text>{`${progress}%`}</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    textAlign: "center",
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
  progressBar: {
    height: 20,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
  },
});
export default Upload;
