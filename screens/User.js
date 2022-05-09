import { View, Text } from 'react-native'
import { useEffect } from 'react';
import { fetchPostsByUid } from '../utils/utils';

const User = ({ route, navigation }) => {
    const { userId } = route.params;
    console.log(userId, 'userId')

    useEffect(() => {
        getPost()
    }, [])

    const getPost = async () => {
        const posts = await fetchPostsByUid(userId)
    }

    return (
    <View>
        <Text>User id : {userId}s' Page</Text>
    </View>
    )
}

export default User;