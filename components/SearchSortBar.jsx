import { StyleSheet, View, TextInput } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const SearchSortBar = ({ posts, setSearchFeedData, searchTerm, setSearchTerm }) => {

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
 
    return <View style={styles.barContainer}>
        <View style={styles.search}>
            <MaterialIcons style={styles.searchIcon} name="search" size={30} />
            <TextInput style={styles.searchText} 
            keyboardType="web-search" 
            onChangeText={(text) => {
                    if (!/\W+/.test(text)) {
                        setSearchTerm(text)
                    }
                }} 
            onSubmitEditing={() => performSearch()}>
            </TextInput>
        </View>
        <View style={styles.avi}></View>
    </View>
    
}

const styles = StyleSheet.create({
    barContainer: {
        padding: 8,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#1B242A",
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
    searchIcon: {
        flexGrow: 0,
        padding: 3,
        // color: "#1B242A",
        color: "#F5D349",
    },
    searchText: {
        flexGrow: 1,
        padding: 3,
        fontSize: 20,
        // color: "#1B242A",
        color: "#F5D349",
    },
})

export default SearchSortBar;