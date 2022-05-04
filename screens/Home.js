import { View, Text, Button, Touchable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = ({ navigation }) => {

    const handlePress = () => {
        navigation.navigate('Post')
    }

    return (
    <View>
        <Text>Home Page</Text>
        <Button title="to individual post" onPress={handlePress}/>
    </View>
    )
}

export default Home;