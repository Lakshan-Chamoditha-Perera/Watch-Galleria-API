import {getDownloadURL, ref, storage, uploadBytes} from '../config/firebase.config';

export const uploadImage = async (file: any): Promise<string> => {
    console.log("FirebaseService : uploadImage {}");
    const storageRef = ref(storage, `/${Date.now()}_${file}`);
    const metadata = {
        contentType: file.mimetype,
    };
    await uploadBytes(storageRef, file.buffer as ArrayBuffer, metadata);
    return await getDownloadURL(storageRef);
};

