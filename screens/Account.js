import { useState } from "react";
import {
  ScrollView,
  View,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Button,
  Text,
} from "react-native";
import { db } from "../firebase.config";
import { useAuth } from "../contexts/User";
import { DefaultAvatar, DefaultImg } from '../img/avatar'





const Account = ({ navigation }) => {
  const [username, setUsername] = useState("testUser");
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleDelete = async () => {};

  const handleLogout = async () => {
    console.log(currentUser);
    try {
      await logout();
    } catch (err) {
      alert(`Logout failed: ${err}`);
    }
  };

  if (isLoading)
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );

  return (
    <ScrollView style={styles.container}>

<DefaultAvatar />
<View>
  <Text style={styles.username}>{username}</Text>
</View>


<View >
      <View style={styles.footer_logout }>
        <Button style={{ textAlign:"center" }} title="Logout" onPress={handleLogout} color="#E37399" />
      </View> 
      <View style={styles.footer_delete}>
        <Button style={{ textAlign:"center" }} title="Delete Account" onPress={handleDelete} color="#E37399" />
      </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
row: {
display: 'flex',
flexWrap: 'wrap',
padding: 10
},

column: {
  flex: '25%',
  maxWidth: '25%',
  padding: 10
},

column_img: {
marginTop: 8,
textAlignVertical: 'middle',
width: 100,
backgroundColor: 'black'
},

  footer_delete: {
alignItems:'center'
  },
  footer_logout: {
    alignItems:'center',
marginBottom:'10px'
  },
  username: {
textAlign: "center",
textTransform: 'uppercase',
fontFamily: '"Times New Roman", Times, serif',
fontWeight: 'bold',
fontSize: '30px',
  },
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginBottom: 7,
  },
});

export default Account;
