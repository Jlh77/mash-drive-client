import { doc, collection } from 'firebase/firestore'
import { db } from '../firebase.config'

export const fetchUserByUid =  async (uid) => {
    try {
        const userRef = db.collection('users').doc(uid);
        const user = await userRef.get()
        
        if (!user) {
            console.log('No user found with that id')
        } else {
            return user.data();
        }



    } catch (err) {
        alert(`Error: ${err}`);
        // Eventually error states used etc and for invalid input too
      }
}