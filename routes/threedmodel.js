const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
var WikitudeStudioApiClient = require('wikitude_client');

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

function saveImage(baseImage) {
    /*path of the folder where your project is saved. (In my case i got it from config file, root path of project).*/
    const uploadPath = path.resolve();
    //path of folder where you want to save the image.
    const localPath = `${uploadPath}/markerimages/`;
    //Find extension of file
    const ext = baseImage.substring(baseImage.indexOf("/") + 1, baseImage.indexOf(";base64"));
    const fileType = baseImage.substring("data:".length, baseImage.indexOf("/"));
    //Forming regex to extract base64 data of file.
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
    //Extract base64 data.
    const base64Data = baseImage.replace(regex, "");
    const rand = Math.ceil(Math.random() * 1000);
    //Random photo name with timeStamp so it will not overide previous images.
    const filename = `Photo_${Date.now()}_${rand}.${ext}`;

    //Check that if directory is present or not.
    if (!fs.existsSync(`${uploadPath}/markerimages/`)) {
        fs.mkdirSync(`${uploadPath}/markerimages/`);
    }
    if (!fs.existsSync(localPath)) {
        fs.mkdirSync(localPath);
    }
    fs.writeFileSync(localPath + filename, base64Data, 'base64');
    return { filename, localPath };
}

router.post('/', upload.single('file'), async (req, res) => {

    const targetimage = saveImage(req.body.targetImage);
    // type: 'none',
    // fileData: '',
    // file: null,
    // width: 250,
    // height: 150,
    // rotate: null,
    // controlls: []



    var apiInstance = new WikitudeStudioApiClient.ImageTargetApi();
    var xVersion = "3";
    var xToken = "ea704952b26e61d4e839afc34e95ff74";
    var contentType = "application/json";
    var tcId = "5fb6061995d79d506359920f";
    var opts = {
        'createImageTargetsBody': [
            {
                "name": targetimage.filename,
                "imageUrl": `https://guarded-shelf-88919.herokuapp.com/api/markerimages/${targetimage.filename}`,
                "physicalHeight": 42,
                "metadata": {
                    "type": `${req.body.metadata.type}`,
                    "filename": `${targetimage.filename}`,
                    "filePath": "null",
                    "width": `${req.body.metadata.width}`,
                    "height": `${req.body.metadata.height}`,
                    "rotate": `${req.body.metadata.height}`,
                }
            }
        ]
    };
    apiInstance.createImageTargets(xVersion, xToken, contentType, tcId, opts).then(function (data) {
        console.log('API called successfully. Returned data: ' + data);
        console.log(data)
        const file = req.file
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return res.send("some thing went wrong").status(400)
        }
        return res.send(data).status(200);
    }, function (error) {
        console.log("error")
        console.error(error);
        return res.send("some thing went wrong").status(400);
    });


    // res.send(file)
});

module.exports = router;