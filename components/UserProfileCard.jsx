import { View, Text, Image, StyleSheet } from "react-native";

const UserProfileCard = ({ usersData }) => {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={{ uri: usersData.avatar_url }}></Image>
      </View>
      <Text style={styles.username}>{usersData.username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //   flex: 1,
    //   backgroundColor: '#F5D349',
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    textAlign: "center",
    textTransform: "uppercase",
    // fontFamily: '"Times New Roman", Times, serif',
    fontWeight: "bold",
    fontSize: 30,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 1000,
    alignItems: "center",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
  },
});

export default UserProfileCard;
