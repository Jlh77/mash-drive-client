import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { ShortPostCard } from './index';

const SearchFeed = ({ searchFeedData, setSearchFeedData, searchTerm }) => {
    
    return <View style={styles.feedContainer}>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={() => {setSearchFeedData([])}}>Back</Pressable>
                </View>
                <View style={styles.postsContainer}>
                    {searchTerm.length > 0 ? 
                    <Text style={styles.text}>Search Results for {searchTerm}...</Text> : 
                    <Text style={styles.text}>Sorry, that search won't work. Please only search for letters or numbers.</Text>}
                    <FlatList style={styles.feedList} data={searchFeedData} renderItem={(post) => {
                        return <ShortPostCard post={post} />
                    }}>
                    </FlatList >
                </View> 
            </View>
}

const styles = StyleSheet.create({
    feedContainer: {
        flex: 1,
    },
    text: {
        margin: 10,
        color: "#1B242A",
        fontFamily: "helvetica",
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        margin: 10,
    },
    button: {
        borderColor: "#1B242A",
        borderStyle: "solid",
        borderWidth: 3,
        backgroundColor: "#F5D349",
        width: 80,
        padding: 5,
        color: "#1B242A",
        fontFamily: "helvetica",
        fontWeight: "bold",
        fontSize: 14,
        borderRadius: 3,
        textAlign: "center",
    },
    postsContainer: {
        flex: 1,
    },
})

export default SearchFeed;