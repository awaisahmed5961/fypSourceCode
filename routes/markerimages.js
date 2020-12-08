const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
var vuforia = require('vuforia-api');




router.post('/', async (req, res) => {

    const TargetImagefile = saveImage(req.body.Image);
    console.log(TargetImagefile)

    if (req.body.metadata.type === "video") {
        const videoAr = saveArVideo(req.body.metadata.fileData);
        res.send("uploaded");
    }
    else if (req.body.metadata.type === "audio") {
        const araudio = saveArAudio(req.body.metadata.fileData);
        res.send("uploaded");
    }
    else if (req.body.metadata.type === 'image') {
        const arImage = saveArImage(req.body.metadata.fileData);
        res.send("uploaded");
    }
    // console.log(arImage);
    // console.log(req.body.metadata);



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