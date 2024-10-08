const express = require('express')
const multer = require('multer')
const { uploadImageToCloudinary, deleteImageFromCloudinary } = require('../../utils/cloudinary')
const router = express.Router()

const upload = multer({ dest: 'uploads/' })

router.post('/upload-media', upload.single('file'), async (req, res) => {
    try {
        const result = await uploadImageToCloudinary(req.file)
        res.json({ success: true, message: "Image uploaded successfully", result })
    } catch (error) {
        res.json({ success: false, message: "Image upload failed", error })
    }
})

router.post('/delete-media', upload.single('file'), async (req, res) => {
    try {
        const result = await deleteImageFromCloudinary(req.body.publicId)
        res.json({ success: true, message: "Image deleted successfully", result })
    } catch (error) {
        res.json({ success: false, message: "Image deletion failed", error })
    }
})

module.exports = router