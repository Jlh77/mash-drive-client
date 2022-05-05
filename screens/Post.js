import { View, Text } from 'react-native'

const Post = ({route, navigation}) => {
    const { id } = route.params;
    return (
    <View>
        <Text>Post for recipe {id}'s' Page</Text>
    </View>
    )
}

export default Post;