import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

const ShortPostCard = ({ post }) => {

    
    const content = post.item;

    const navigation = useNavigation();

    const postPress = (id) => {
        // setCurrentRoute(() => 'Post')
        navigation.navigate('Post', { id: content.id })
    }

    return <View style={[styles.cardContainer, styles.wireframeBorder]}>
        <View style={[styles.dataContainer, styles.wireframeBorder]}>
            <View style={[styles.avi, styles.wireframeBorder]}></View>
            {/* <Image style={[styles.avi, styles.wireframeBorder]} source={{uri: "userId",}}></Image> */}
            <Text style={[styles.username, styles.wireframeBorder]}>Username</Text>
        </View>
        <Text style={[styles.title, styles.wireframeBorder]}>{content.title}</Text>
        <TouchableOpacity style={[styles.imageContainer, styles.wireframeBorder]} onPress={() => postPress(content.id)}>
            <Image style={[styles.imageContainer, styles.wireframeBorder]} source={{uri: `${content.image_url}`,}}></Image>
        </TouchableOpacity>
    </View>    
}

const styles = StyleSheet.create({
    // wireframeBorder: {
    //     borderColor: "black",
    //     borderStyle: "solid",
    //     borderWidth: 1,
    // },
    cardContainer: {
        margin: 16,
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
    },
    imageContainer: {
        height: 150,
    },
    dataContainer: {
        display: "flex",
        flexDirection: "row",
    },
    avi: {
        width: 20,
        borderRadius: 10,
        backgroundColor: "red",
        margin: 3,
    },
    username: {
        margin: 3,
    },
    title: {
        margin: 3,
    },
})

export default ShortPostCard;