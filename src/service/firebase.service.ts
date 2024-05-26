import { storage, ref, uploadBytes, getDownloadURL } from '../config/firebase.config';

export const uploadImage = async (file: any): Promise<string> => {
    console.log("FirebaseService : uploadImage {}");
    const storageRef = ref(storage, `/${Date.now()}_${file.name}`);
    const metadata = {
        contentType: file.mimetype,
    };

    await uploadBytes(storageRef, file.data as ArrayBuffer, metadata);
    const publicUrl = await getDownloadURL(storageRef);
    return publicUrl;
};

