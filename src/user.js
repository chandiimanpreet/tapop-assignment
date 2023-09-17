import { getAuth, } from "firebase/auth";
import {
    doc, getFirestore, setDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from './firebase-config';
const storage = getStorage(app);

export const addImage = (image) => {
    return new Promise(async (resolve, reject) => {
        const auth = getAuth();
        const db = getFirestore();
        try {
            let imageUrl;
            console.log(image[0].name)
            const ImageRef = ref(storage, `images/${auth.currentUser.uid}/${image[0].name}`);
            const uploadResult = await uploadBytes(ImageRef, image[0]);
            imageUrl = await getDownloadURL(uploadResult.ref);


            await setDoc(doc(db, 'user', auth.currentUser.email), {
                imageUrl
            });
            resolve({ imageUrl });
        } catch (error) {
            reject({ msg: error.message });
        }
    })
};
