import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ShortPostCard } from './index';

const Feed = ({ posts }) => {
  
    return <View style={styles.feedContainer}>
                <Text style={styles.text}>Your feed...</Text>
                <FlatList style={styles.feedList} data={posts} renderItem={(post) => {
                    return <ShortPostCard post={post} />
                }}>
                </FlatList >
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
})

export default Feed;