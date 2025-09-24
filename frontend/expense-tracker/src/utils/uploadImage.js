import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('profileImage', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data?.imageUrl || "";
    } catch (error) {
        console.error('Image upload failed:', error);
        throw error; // rethrow to let caller handle it
    }  
};

export default uploadImage;