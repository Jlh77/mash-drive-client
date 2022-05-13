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
import * as ImagePicker from "expo-image-picker";
import * as placeholder from "../img/mashholder.png";

import { db, storage } from "../firebase.config";
import { useAuth } from "../contexts/User";

const Upload = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // progress bar states
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedPostId, setUploadedPostId] = useState(null);

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
    setError(null);
    setUploadedPostId(null);
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

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.fround(
              parseFloat(snapshot.bytesTransferred / snapshot.totalBytes) * 100
            ).toFixed(2);
            setProgress(progress);
          },
          (error) => {
            setError("Failed to upload image. Please try again.");
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
                db.collection("posts")
                  .add({
                    image_url: url,
                    title,
                    description,
                    uid: currentUser.uid,
                    upvotes: 0,
                    downvotes: 0,
                    parent_post_id: null,
                  })
                  .then((docRef) => {
                    setUploadedPostId(docRef.id);
                    setIsUploading(false);
                    setProgress(0);
                  });
              });
          }
        );
      } catch (err) {
        alert(`Error: ${err}`);
        setError("Failed to upload image. Please try again.");
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
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 40,
          color: "rgb(245, 211, 73)",
          margin: 30,
        }}
      >
        Upload
      </Text>

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      )}

      <Button
        title="Choose Image"
        onPress={pickImage}
        color="rgb(245, 211, 73)"
      />
      {/* Choose either this or below  depending on ultimate styling preferences */}
      {/* {image && (
        <>
          <Image source={{ uri: image.uri }} style={styles.selectedImage} />
          <Button title="X" onPress={setImage(null)} />
        </>
      )} */}
      <View style={styles.imageContainer}>
        <Image
          // Choose a different placeholder below
          source={{ uri: image?.uri || placeholder }}
          style={styles.selectedImage}
        />
      </View>
      <View>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.inputBox}
            placeholder={"Title"}
            value={title}
            onChangeText={setTitle}
          ></TextInput>
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.inputBox}
            placeholder={"Description"}
            value={description}
            onChangeText={setDescription}
          ></TextInput>
        </View>
      </View>
      <View>
        <Button
          margin={20}
          title="Create Post"
          color="rgb(245, 211, 73)"
          onPress={handleUpload}
        ></Button>
      </View>
      <View>
        {isUploading && (
          <>
            <Text style={{ color: "rgb(245, 211, 73)" }}>
              Uploading your weird food...
            </Text>
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
      <View>
        {uploadedPostId && (
          <>
            <Text style={{ color: "rgb(245, 211, 73)", margin: 20 }}>
              Congratulations, your abomination has been uploaded successfully!
              Click below to view your new creation, or add another...
            </Text>
            <Button
              title="View new post"
              color="rgb(245, 211, 73)"
              onPress={() => {
                setUploadedPostId(null);
                navigation.navigate("Post", { id: uploadedPostId });
              }}
            />
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
    backgroundColor: "rgb(27, 36, 42)",
  },
  errorBox: {
    marginBottom: 20,
    backgroundColor: "red",
    paddingBottom: 10,
    paddingTop: 10,
  },
  errorMessage: {
    color: "white",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 3,
    marginTop: 15,
  },
  inputBox: {
    color: "white",
    padding: 10,
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
  imageContainer: {
    height: "60%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedImage: {
    height: 400,
    width: 400,
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
