import { View, Text, Button, Touchable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = ({ navigation }) => {


    return (
    <View>
        <Text>Home Page</Text>
        <Button title="to individual post" onPress={() => navigation.navigate('Post')}/>
    </View>
    )
}

export default Home;