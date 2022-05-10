import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { fetchUserByUid } from "../utils/utils"

const ShortPostCard = ({ post }) => {

    const content = post.item;
    const navigation = useNavigation();
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const postPress = (id) => {
        navigation.navigate('Post', { id: content.id })
    }

    useEffect(() => {
        setIsLoading(true);
        fetchUserByUid(content.uid)
          .then((data) => {
            setUserData(() => {
                return data;
            })
            setIsLoading(false);
          })
     
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
                    <View style={styles.userDataContainer}>
                        <Image style={styles.avi} source={userData.avatar_url}></Image>
                        <Text style={styles.username}>{userData.username}</Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{content.title}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.imageContainer} onPress={() => postPress(content.id)}>
                    <Image style={styles.imageContainer} source={{uri: `${content.image_url}`,}}></Image>
                </TouchableOpacity>
            </View>   
        )  
    }
}
    

    

const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: 15,
    },
    imageContainer: {
        height: 200,
    },
    dataContainer: {
        marginLeft: 5,
    },
    userDataContainer: {
        flexDirection: "row",
    },
    avi: {
        width: 17,
        borderRadius: 10,
        backgroundColor: "red",
        margin: 3,
    },
    username: {
        margin: 3,
        color: "#1B242A",
        fontFamily: "helvetica",
        fontWeight: "bold",
    },
    title: {
        margin: 3,
        color: "#1B242A",
        fontFamily: "helvetica",
        marginLeft: 5,
        fontWeight: "bold",
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
})

export default ShortPostCard;