import { View, Text } from 'react-native'

const Post = ({ route }) => {
    
    const { postId } = route.params;

    return (
    <View>
        <Text>Post for recipe {postId}'s' Page</Text>
        {/* <Text>Post for a recipe Page</Text> */}
    </View>
    )
}

export default Post;