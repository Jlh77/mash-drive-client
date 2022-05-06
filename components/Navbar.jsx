import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from "../contexts/User";

const Navbar = () => {
    
    const navigation = useNavigation();
    const { currentUser } = useAuth();

    return currentUser ? (
        <View style={[styles.navbar , styles.wireframeBorder]}>
            <TouchableOpacity style={[styles.iconContainer, styles.wireframeBorder]} onPress={() => navigation.navigate('Home')}>
                <FontAwesome5 style={[styles.icon, styles.wireframeBorder]} name="home" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconContainer, styles.wireframeBorder]} onPress={() => navigation.navigate('Leaderboard')}>
                <FontAwesome5 style={[styles.icon, styles.wireframeBorder]} name="list" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconContainer, styles.wireframeBorder]} onPress={() => navigation.navigate('Upload')}>
                <FontAwesome5 style={[styles.icon, styles.wireframeBorder]} name="upload" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconContainer, styles.wireframeBorder]} onPress={() => navigation.navigate('Account')}>
                <FontAwesome5 style={[styles.icon, styles.wireframeBorder]} name="user-alt" size={24} />
            </TouchableOpacity>
        </View>
        ) : (
        <View style={[styles.navbar , styles.wireframeBorder]}>
            <TouchableOpacity style={[styles.iconContainer, styles.wireframeBorder]} onPress={() => navigation.navigate('Login')}>
                <FontAwesome5 style={[styles.icon, styles.wireframeBorder]} name="sign-in-alt" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconContainer, styles.wireframeBorder]} onPress={() => navigation.navigate('Register')}>
                <FontAwesome5 style={[styles.icon, styles.wireframeBorder]} name="file-signature" size={24} />
            </TouchableOpacity>
        </View>
        )
}

const styles = StyleSheet.create({
    // wireframeBorder: {
    //     borderColor: "black",
    //     borderStyle: "solid",
    //     borderWidth: 1,
    // },
    navbar: {
        padding: 8,
        display: "flex",
        flexDirection: "row",
    },
    iconContainer: {
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
        justifyContent: "space-evenly",
    },
    icon: {
        flexGrow: 0,
        padding: 3,
        color: "grey",
    },
})

export default Navbar;