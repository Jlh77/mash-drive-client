import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react';
import { fetchPostsByUid, fetchUserByUid } from '../utils/utils';

const User = ({ route, navigation }) => {
    const { userId } = route.params;
    const [usersPosts, setUsersPosts] = useState([])
    const [usersData, setUsersData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadInfo()
    }, [])
    
    const loadInfo = async () => {
        const posts = await fetchPostsByUid(userId)
        console.log(posts, 'posts in user')
        const user = await fetchUserByUid(userId)
        setUsersPosts(posts)
        console.log(usersPosts, 'usersPosts in user')
        setUsersData(user)
        setIsLoading(false)
    }
    

    if (isLoading) {
        <View style={styles.preloader}>
          <ActivityIndicator size='small'></ActivityIndicator>
        </View>;
      } 
    

    return (
    <View>
        <Text>{usersData.username}s' Page</Text>
        <Image style={styles.image} source={usersData.avatar_url}></Image>
        <View style={styles.statsBox}>
        <Text>Stats: </Text>
        <Text>Number of Posts: {usersPosts.length}</Text>
        <Text>Reputation: {usersData.reputation}</Text>
        {/* <Text>Number of Comments: {usersData.array_of_comment_ids}</Text> */}
        </View>
        <View>
            <Text>{usersData.username}'s Posts</Text>
            {usersPosts.map(post => {
                return <TouchableOpacity style={styles.postLink} key={post.id} onPress={() => navigation.navigate('Post', { id: post.id})}>
                    <Text>{post.title}</Text>
                    <Text>{post.votes}</Text>
                </TouchableOpacity> 
            })}
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100
    },
    statsBox: {
        borderWidth: 1,
        backgroundColor: 'beige'
    },
    postLink: {
        borderWidth: 1,
        backgroundColor: 'beige'
    }
})

export default User;