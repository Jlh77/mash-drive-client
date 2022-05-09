import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ShortPostCard } from './index';

const Feed = ({ posts, setCurrentRoute }) => {
    
    return <View style={styles.feedContainer}>
                <Text style={styles.text}>Your feed...</Text>
                <FlatList style={styles.feedList} data={posts} renderItem={(post) => {
                    return <ShortPostCard post={post} />
                    // return <ShortPostCard post={post} setCurrentRoute={setCurrentRoute} />
                }}>
                </FlatList >
            </View>
}

const styles = StyleSheet.create({
    // wireframeBorder: {
    //     borderColor: "black",
    //     borderStyle: "solid",
    //     borderWidth: 1,
    // },
    feedContainer: {
        flex: 1,
    },
    text: {
        margin: 16,
    },
})

export default Feed;