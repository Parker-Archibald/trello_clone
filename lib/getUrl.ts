import { storage } from '@/appwrite'

const getUrl = async (image: Image | any) => {
    const url = storage.getFilePreview(image.bucketId, image.fileId);

    return url
}

export default getUrl;