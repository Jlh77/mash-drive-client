import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { fetchUserByUid } from "../utils/utils";

const ShortPostCard = ({ post }) => {
  const content = post.item;
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const postPress = (id) => {
    navigation.navigate("Post", { id: content.id });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUserByUid(content.uid).then((data) => {
      setUserData(() => {
        return data;
      });
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  } else {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.dataContainer}>
          <TouchableOpacity style={styles.userDataContainer} onPress={() => navigation.navigate('User', { userId: content.uid })}>
              <Image
                style={styles.avi}
                source={
                  userData.avatar_url
                    ? userData.avatar_url
                    : require("../img/default_avatar.jpeg")
                }
              ></Image>
            <Text style={styles.username}>{userData.username}</Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{content.title}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => postPress(content.id)}
        >
          <Image
            style={styles.imageContainer}
            source={{
              uri: `${
                content.image_url
                  ? content.image_url
                  : require("../img/defaultImage.jpeg")
              }`,
            }}
          ></Image>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 15,
  },
  imageContainer: {
    height: 200,
  },
  dataContainer: {
    backgroundColor: "#1B242A",
    paddingTop: 3,
    borderStyle: "solid",
    borderColor: "#1B242A",
    borderWidth: 2,
    borderBottomWidth: 0,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  userDataContainer: {
    flexDirection: "row",
  },
  avi: {
    width: 17,
    borderRadius: 10,
    margin: 3,
  },
  username: {
    margin: 3,
    color: "#F5D349",
    fontWeight: "500",
    letterSpacing: 1,
  },
  title: {
    margin: 3,
    color: "#F4F5F4",
    marginLeft: 5,
    letterSpacing: 1,
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

export default ShortPostCard;
