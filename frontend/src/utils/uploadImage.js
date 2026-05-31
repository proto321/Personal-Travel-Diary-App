import axios from "./axiosInstance"

const uploadImage = async(imageFile) => {
    const formData = new FormData()

    formData.append("image", imageFile)

    try {
        const response = await axios.post(
            "/travel-story/image-upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data", // set header for file upload
            },
        }
        )

        return response.data 
    
    } catch (error) {
        console.log("Error uploading image:", error)
        throw error // Rethrow the error to be handled by the caller
    }
}

export default uploadImage