const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadImageToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: 'auto'
        })

        return result;
    } catch (error) {
        return error.message;
    }
};


const deleteImageFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId)
        return result
    } catch (error) {
        return error.message
    }
}


module.exports = {
    uploadImageToCloudinary,
    deleteImageFromCloudinary
}
