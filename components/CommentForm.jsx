import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from "../contexts/User";

const CommentForm = ({ navigation, postData }) => {
    console.log(postData, 'postData')
    const { currentUser } = useAuth();

    if(!currentUser) {
        return (
            <TouchableOpacity onPress={() => {navigation.navigate('Login')}}>
                <Text>Please login to leave a comment</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <Text>logged in</Text>
        </View>
    )

}

export default CommentForm;