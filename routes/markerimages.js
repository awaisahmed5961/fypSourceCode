const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
var WikitudeStudioApiClient = require('wikitude_client');

router.post('/', async (req, res) => {

    const TargetImagefile = saveImage(req.body.Image);
    let arName = ''
    if (req.body.metadata.type === "video") {
        arName = saveArVideo(req.body.metadata.fileData);
    }
    else if (req.body.metadata.type === "audio") {
        arName = saveArAudio(req.body.metadata.fileData);
    }
    else if (req.body.metadata.type === 'image') {
        arName = saveArImage(req.body.metadata.fileData);
        // return res.status(200).send("uploaded");
    }

    var apiInstance = new WikitudeStudioApiClient.ImageTargetApi();
    var xVersion = "3";
    var xToken = "ea704952b26e61d4e839afc34e95ff74";
    var contentType = "application/json";
    var tcId = "5fb6061995d79d506359920f";
    var opts = {
        'createImageTargetsBody': [
            {

                "name": TargetImagefile.filename,
                "imageUrl": `https://guarded-shelf-88919.herokuapp.com/api/markerimages/${TargetImagefile.filename}`,
                "physicalHeight": 42,
                "metadata": {
                    "type": `${req.body.metadata.type}`,
                    "filename": `${arName.filename}`,
                    "filePath": "null",
                    "width": `${req.body.metadata.width}`,
                    "height": `${req.body.metadata.height}`,
                    "rotate": `${req.body.metadata.height}`,
                }
            }
        ]
    };
    apiInstance.createImageTargets(xVersion, xToken, contentType, tcId, opts).then(function (data) {
        return res.send(data).status(200);
    }, function (error) {
        console.log("error")
        console.error(error);
        return res.send("some thing went wrong").status(400);
    });

});

/*Download the base64 image in the server and returns the filename and path of image.*/
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

/*Download the base64 image in the server and returns the filename and path of image.*/
function saveArVideo(baseVideo) {
    /*path of the folder where your project is saved. */
    const uploadPath = path.resolve();
    //path of folder where you want to save the image.
    const localPath = `${uploadPath}/cloud/assets/ArContent/ArVideos/`;
    //Find extension of file
    const ext = baseVideo.substring(baseVideo.indexOf("/") + 1, baseVideo.indexOf(";base64"));
    const fileType = baseVideo.substring("data:".length, baseVideo.indexOf("/"));
    //Forming regex to extract base64 data of file.
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
    //Extract base64 data.
    const base64Data = baseVideo.replace(regex, "");
    const rand = Math.ceil(Math.random() * 1000);
    //Random photo name with timeStamp so it will not overide previous images.
    const filename = `arcontent_${Date.now()}_${rand}.${ext}`;

    //Check that if directory is present or not.
    if (!fs.existsSync(`${uploadPath}/cloud/assets/ArContent/ArVideos/`)) {
        fs.mkdirSync(`${uploadPath}/cloud/assets/ArContent/ArVideos/`);
    }
    if (!fs.existsSync(localPath)) {
        fs.mkdirSync(localPath);
    }
    fs.writeFileSync(localPath + filename, base64Data, 'base64');
    return { filename, localPath };
}

/*Download the base64 image in the server and returns the filename and path of image.*/
function saveArAudio(baseAudio) {
    /*path of the folder where your project is saved. */
    const uploadPath = path.resolve();
    //path of folder where you want to save the image.
    const localPath = `${uploadPath}/cloud/assets/ArContent/ArAudio/`;
    //Find extension of file
    const ext = baseAudio.substring(baseAudio.indexOf("/") + 1, baseAudio.indexOf(";base64"));
    const fileType = baseAudio.substring("data:".length, baseAudio.indexOf("/"));
    //Forming regex to extract base64 data of file.
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
    //Extract base64 data.
    const base64Data = baseAudio.replace(regex, "");
    const rand = Math.ceil(Math.random() * 1000);
    //Random photo name with timeStamp so it will not overide previous images.
    const filename = `arcontent_${Date.now()}_${rand}.${ext}`;

    //Check that if directory is present or not.
    if (!fs.existsSync(`${uploadPath}/cloud/assets/ArContent/ArAudio/`)) {
        fs.mkdirSync(`${uploadPath}/cloud/assets/ArContent/ArAudio/`);
    }
    if (!fs.existsSync(localPath)) {
        fs.mkdirSync(localPath);
    }
    fs.writeFileSync(localPath + filename, base64Data, 'base64');
    return { filename, localPath };
}

function saveArImage(baseImage) {
    /*path of the folder where your project is saved. */
    const uploadPath = path.resolve();
    //path of folder where you want to save the image.
    const localPath = `${uploadPath}/cloud/assets/ArContent/ArImage/`;
    //Find extension of file
    const ext = baseImage.substring(baseImage.indexOf("/") + 1, baseImage.indexOf(";base64"));
    const fileType = baseImage.substring("data:".length, baseImage.indexOf("/"));
    //Forming regex to extract base64 data of file.
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
    //Extract base64 data.
    const base64Data = baseImage.replace(regex, "");
    const rand = Math.ceil(Math.random() * 1000);
    //Random photo name with timeStamp so it will not overide previous images.
    const filename = `arcontent_${Date.now()}_${rand}.${ext}`;

    //Check that if directory is present or not.
    if (!fs.existsSync(`${uploadPath}/cloud/assets/ArContent/ArImage/`)) {
        fs.mkdirSync(`${uploadPath}/cloud/assets/ArContent/ArImage/`);
    }
    if (!fs.existsSync(localPath)) {
        fs.mkdirSync(localPath);
    }
    fs.writeFileSync(localPath + filename, base64Data, 'base64');
    return { filename, localPath };
}




module.exports = router;