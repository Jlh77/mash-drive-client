import { Pressable, View, Text, StyleSheet } from 'react-native'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units'
import { useAuth } from '../contexts/User'
import { useState, useEffect } from 'react';

const UpDownVoteButtons = ({ postData }) => {
    const { currentUser } = useAuth();
    const [ votecount, setVotecount] = useState()
    const [upIsPressed, setUpIsPressed] = useState()
    const [downIsPressed, setDownIsPressed] = useState()
    /* console.log(postData, 'postData')
    console.log(currentUser, 'currentUser')

    useEffect(() => {
        if (currentUser.upvotes.includes(postData.id)) {
            setUpIsPressed(true);
        }
        if (currentUser.downvotes.includes(postData.id)) {
            setDownIsPressed(true);
        }
    }, []) */

    const upvotePressed = () => {

    }

    const downvotePressed = () => {

    }

    return (
        <View style={styles.container}>
            <View styles={styles.votesContainer}>
            <Text style={styles.voteNo}>Votes: {postData.upvotes - postData.downvotes}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.pressable} onPress={upvotePressed}>
                    <Text style={styles.pressableText}>▲</Text>
                </Pressable>
                <Pressable style={styles.pressable} onPress={downvotePressed}>
                    <Text style={styles.pressableText}>▼</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default UpDownVoteButtons;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: 100,
        width: 100,
    },
    pressableText: {
        fontSize: 3*vmin,
        lineHeight: 21,
        letterSpacing: 0.25,
    color: '#F5D349',
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 1,
},
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: '#885A2C',
    color: '#F5D349',
    width: "40%",
    height: "30%",
    margin: 3, 
},
votesContainer: {
    width: "50%",
    justifyContent: "center",
},
buttonContainer: {
    width: "50%",
    justifyContent: "space-evenly",

},
voteNo: {
    justifyContent: "center",
    height: "50%",
    padding: 5,
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 1,
}
})