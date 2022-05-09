import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const SearchSortBar = () => {

    const navigation = useNavigation();

    return <View style={[styles.barContainer, styles.wireframeBorder]}>
        <TouchableOpacity style={[styles.search, styles.wireframeBorder]}>
            {/* <FontAwesome5 style={[styles.searchIcon, styles.wireframeBorder]} name="search" size={24} color="grey" /> */}
            <MaterialIcons style={[styles.searchIcon, styles.wireframeBorder]} name="search" size={30} color="grey" />
            <Text style={[styles.searchText, styles.wireframeBorder]}>Search</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={[styles.sort, styles.wireframeBorder]}>
            <FontAwesome5 style={[styles.sortIcon, styles.wireframeBorder]} name="sort" size={24} color="grey" />
            <Text style={[styles.sortText, styles.wireframeBorder]}>Sort</Text>
        </TouchableOpacity> */}
        <View style={[styles.avi, styles.wireframeBorder]}></View>
    </View>
    
}

const styles = StyleSheet.create({
    // wireframeBorder: {
    //     borderColor: "black",
    //     borderStyle: "solid",
    //     borderWidth: 1,
    // },
    barContainer: {
        padding: 3,
        display: "flex",
        flexDirection: "row",
    },
    search: {
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
    },
    sort: {
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
    },
    searchText: {
        flexGrow: 1,
        paddingTop: 7,
        height: 25,
    },
    sortIcon: {
        flexGrow: 0,
        padding: 3,
    },
    sortText: {
        flexGrow: 1,
    },
})

export default SearchSortBar;