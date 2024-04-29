import { ID, storage } from "@/appwrite";


const uploadImage = async (file: File) => {

    if (!file) return;

    const fileUploaded = await storage.createFile(
        '662bc4bf16b25251a025',
        ID.unique(),
        file
    )

    return fileUploaded;

}

export default uploadImage;