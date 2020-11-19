const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const multer = require('multer');

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.resolve();
        //path of folder where you want to save the image.
        const localPath = `${uploadPath}/cloud/assets/ArContent/Ar3Dmodels/`;
        cb(null, localPath)
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    }

})

var upload = multer({ storage: storage })


router.post('/', upload.single('file'), async (req, res) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    console.log(file)

    res.send(file)
});

module.exports = router;