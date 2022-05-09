import {getDocs} from 'firebase/firestore';

const fetchPosts = async (postsData) => {

    const newPosts = await getDocs(postsData)
        .then((data) => {
            let posts = []
            data.docs.forEach((doc) => {
                posts.push({ ...doc.data(), id: doc.id })
            })
            return posts;
        })
    return newPosts;
}

export default fetchPosts;