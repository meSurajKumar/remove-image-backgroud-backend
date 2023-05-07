const express = require('express')
const router = express.Router();
const fileUpload = require('express-fileupload')
const fileUploads = fileUpload({limits:{fileSize: 1024 * 1024},abortOnLimit: true})
const imagesController = require('../controllers/removeBg')


router.post('/images-file',[fileUploads],imagesController.removeBackgoundByImage)



module.exports =router