import {getDocs} from 'firebase/firestore';

const fetchUsers = async (usersData) => {

    const newUsers = await getDocs(usersData)
        .then((data) => {
            let users = []
            data.docs.forEach((doc) => {
                users.push({ ...doc.data(), id: doc.id })
            })
            return users;
        })
    return newUsers;
}

export default fetchUsers;