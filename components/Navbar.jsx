import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons, MaterialCommunityIcons  } from '@expo/vector-icons';
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

    // const navPress = (pathname, params = "") => {
    //     if (params === "") {
    //         setCurrentRoute(() => pathname);
    //         navigation.navigate(pathname);
    //     } else {
    //         setCurrentRoute(() => pathname);
    //         navigation.navigate(pathname, params);
    //     }
    // }

    return currentUser ? (
        <View style={[styles.navbar , styles.wireframeBorder]}>
            <TouchableOpacity style={[styles.iconContainer, styles.wireframeBorder]} onPress={() => navPress('Home')}>
            {/* <TouchableOpacity style={[styles.iconContainer, styles.wireframeBorder]} onPress={() => navPress('Home', {setCurrentRoute: setCurrentRoute})}> */}
                {/* <FontAwesome5 style={[activeIconCheck("Home"), styles.wireframeBorder]} name="home" size={24} /> */}
                <MaterialIcons style={[activeIconCheck("Home"), styles.wireframeBorder]} name="home" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconContainer, styles.wireframeBorder]} onPress={() => navPress('Leaderboard')}>
                {/* <FontAwesome5 style={[activeIconCheck("Leaderboard"), styles.wireframeBorder]} name="list" size={24} /> */}
                <MaterialIcons style={[activeIconCheck("Leaderboard"), styles.wireframeBorder]} name="leaderboard" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconContainer, styles.wireframeBorder]} onPress={() => navPress('Upload')}>
                {/* <FontAwesome5 style={[activeIconCheck("Upload"), styles.wireframeBorder]} name="upload" size={24} /> */}
                <MaterialIcons style={[activeIconCheck("Upload"), styles.wireframeBorder]} name="add-circle" size={30} />
                {/* <MaterialIcons style={[activeIconCheck("Upload"), styles.wireframeBorder]} name="add-circle-outline" size={24} /> */}
                {/* <MaterialCommunityIcons style={[activeIconCheck("Upload"), styles.wireframeBorder]} name="food-fork-drink" size={24} /> */}
                {/* <MaterialCommunityIcons style={[activeIconCheck("Upload"), styles.wireframeBorder]} name="silverware-fork" size={24} /> */}
                {/* <MaterialCommunityIcons style={[activeIconCheck("Upload"), styles.wireframeBorder]} name="silverware-fork-knife" size={24} /> */}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconContainer, styles.wireframeBorder]} onPress={() => navPress('Account')}>
                {/* <FontAwesome5 style={[activeIconCheck("Account"), styles.wireframeBorder]} name="user-alt" size={24} /> */}
                <MaterialIcons style={[activeIconCheck("Account"), styles.wireframeBorder]} name="account-box" size={30} />
                {/* <MaterialIcons style={[activeIconCheck("Account"), styles.wireframeBorder]} name="account-circle" size={24} /> */}
                {/* <MaterialCommunityIcons style={[activeIconCheck("Account"), styles.wireframeBorder]} name="account" size={24} /> */}
                {/* <MaterialCommunityIcons style={[activeIconCheck("Account"), styles.wireframeBorder]} name="account-circle-outline" size={24} /> */}
                {/* <MaterialCommunityIcons style={[activeIconCheck("Account"), styles.wireframeBorder]} name="account-cog" size={24} /> */}
                {/* <MaterialCommunityIcons style={[activeIconCheck("Account"), styles.wireframeBorder]} name="account-cog-outline" size={24} /> */}
            </TouchableOpacity>
        </View>
        ) : (
        <View style={[styles.navbar , styles.wireframeBorder]}>
            <TouchableOpacity style={[styles.iconContainer, styles.wireframeBorder]} onPress={() => navPress('Login')}>
                {/* <FontAwesome5 style={[activeIconCheck("Login"), styles.wireframeBorder]} name="sign-in-alt" size={24} /> */}
                <MaterialCommunityIcons style={[activeIconCheck("Login"), styles.wireframeBorder]} name="login" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconContainer, styles.wireframeBorder]} onPress={() => navPress('Register')}>
                {/* <FontAwesome5 style={[activeIconCheck("Register"), styles.wireframeBorder]} name="file-signature" size={24} /> */}
                <MaterialCommunityIcons style={[activeIconCheck("Register"), styles.wireframeBorder]} name="account-plus" size={30} />
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
    iconActive: {
        flexGrow: 0,
        padding: 3,
        color: "#4098F6",
    },
})

export default Navbar;