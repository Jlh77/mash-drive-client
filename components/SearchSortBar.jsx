import { StyleSheet, View, TextInput } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";

const SearchSortBar = ({ posts, setSearchFeedData, searchTerm, setSearchTerm }) => {

    const [searchActive, setSearchActive] = useState(false);

    const performSearch = () => {
        const postsData = [...posts];
        const regex = new RegExp(searchTerm, "gi");
        setSearchFeedData(
            postsData.filter(post => {
                const titleArray = post.title.split(" ");
                return regex.test(titleArray)
            })
        ) 
    }

    const activeIconCheck = (activeStyle, inactiveStyle) => {
        return searchActive ? activeStyle : inactiveStyle
    }
 
    return <View style={activeIconCheck(styles.barContainerActive, styles.barContainerInactive)}>
        <View style={styles.search}>
            <MaterialIcons style={activeIconCheck(styles.searchIconActive, styles.searchIconInactive)} name="search" size={30} />
            <TextInput style={activeIconCheck(styles.searchTextActive, styles.searchTextInactive)} 
            keyboardType="web-search" 
            onChangeText={(text) => {
                    setSearchActive(true)
                    if (!/\W+/.test(text)) {
                        setSearchTerm(text)
                    }
                }} 
            onSubmitEditing={() => performSearch()}>
            </TextInput>
        </View>
        <View style={styles.avi}></View>
        {/* <Image style={styles.avi} source={currentUser.avatar_url}></Image> */}
    </View>
    
}

const styles = StyleSheet.create({ 
    barContainerActive: {
        padding: 8,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#1B242A",
    },
    barContainerInactive: {
        padding: 8,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#F5D349",
    },
    search: {
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
    },
    avi: {
        flexBasis: 30,
        borderRadius: 30,
        backgroundColor: "green",
        margin: 3,
        flexGrow: 0,
    },
    searchIconActive: {
        flexGrow: 0,
        padding: 3,
        color: "#F5D349",
    },
    searchIconInactive: {
        flexGrow: 0,
        padding: 3,
        color: "#1B242A",
    },
    searchTextActive: {
        flexGrow: 1,
        padding: 3,
        fontSize: 20,
        color: "#F5D349",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 3,
        borderColor: "#F5D349",
    },
    searchTextInactive: {
        flexGrow: 1,
        padding: 3,
        fontSize: 20,
        color: "#1B242A",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 3,
        borderColor: "#1B242A",
    },
})

export default SearchSortBar;