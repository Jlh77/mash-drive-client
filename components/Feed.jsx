import { StyleSheet, Text, ScrollView } from 'react-native';
import { ShortPostCard } from './index';

const Feed = () => {

    return <ScrollView style={styles.feedContainer}>
            <Text style={styles.text}>Your feed...</Text>
        <ShortPostCard/>
        <ShortPostCard/>
        <ShortPostCard/>
    </ScrollView>

}

const styles = StyleSheet.create({
    wireframeBorder: {
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
    },
    feedContainer: {
        flexGrow: 1,
    },
    text: {
        margin: 16,
    },
})

export default Feed;