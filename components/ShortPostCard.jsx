import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const ShortPostCard = () => {

    const navigation = useNavigation();

    return <View style={[styles.cardContainer, styles.wireframeBorder]}>
        <View style={[styles.dataContainer, styles.wireframeBorder]}>
            <View style={[styles.avi, styles.wireframeBorder]}></View>
            {/* <Image style={[styles.avi, styles.wireframeBorder]}></Image> */}
            <Text style={[styles.username, styles.wireframeBorder]}>Username</Text>
        </View>
        <Text style={[styles.title, styles.wireframeBorder]}>Title</Text>
        <TouchableOpacity style={[styles.imageContainer, styles.wireframeBorder]} onPress={() => navigation.navigate('Post')}>
            {/* <Image></Image> */}
        </TouchableOpacity>
    </View>    
}

const styles = StyleSheet.create({
    wireframeBorder: {
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
    },
    cardContainer: {
        margin: 16,
    },
    imageContainer: {
        height: 150,
        backgroundColor: "blue",
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