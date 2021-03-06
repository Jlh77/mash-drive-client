import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, MaterialCommunityIcons  } from '@expo/vector-icons';
import { useAuth } from "../contexts/User";
import { useState } from "react";
    const Navbar = () => {
    
    const navigation = useNavigation();
    const { currentUser } = useAuth();

    const [currentRoute, setCurrentRoute] = useState(currentUser ? "Home" : "Login");

    const activeIconCheck = (screen) => { 
        return currentRoute === screen ? styles.iconActive : styles.icon
    }

    const navPress = (pathname) => {
        setCurrentRoute(() => pathname);
        navigation.navigate(pathname);
    }

    return currentUser ? (
        <View style={styles.navbar}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navPress('Home')}>
                <MaterialIcons style={activeIconCheck("Home")} name="home" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navPress('Leaderboard')}>
                <MaterialIcons style={activeIconCheck("Leaderboard")} name="leaderboard" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navPress('Upload')}>
                <MaterialIcons style={activeIconCheck("Upload")} name="add-circle" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navPress('Account')}>
                <MaterialIcons style={activeIconCheck("Account")} name="account-box" size={30} />
            </TouchableOpacity>
        </View>
        ) : (
        <View style={styles.navbar}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navPress('Login')}>
                <MaterialCommunityIcons style={activeIconCheck("Login")} name="login" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navPress('Register')}>
                <MaterialCommunityIcons style={activeIconCheck("Register")} name="account-plus" size={30} />
            </TouchableOpacity>
        </View>
        )
}

const styles = StyleSheet.create({
    navbar: {
        padding: 8,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#1B242A",
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
        color: "#F5D349",
    },
    iconActive: {
        flexGrow: 0,
        padding: 3,
        color: "#6E9176",
    },
})

export default Navbar;