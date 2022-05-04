import { View, Text } from 'react-native'

const User = ({ route, navigation }) => {
    const { userId } = route.params;
    return (
    <View>
        <Text>User id : {userId}s' Page</Text>
    </View>
    )
}

export default User;