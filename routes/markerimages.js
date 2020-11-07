const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
var vuforia = require('vuforia-api');




router.post('/', async (req, res) => {

    const TargetImagefile = saveImage(req.body.Image);
    const videoAr = saveArVideo(req.body.metadata.arfile);

    var client = vuforia.client({

        // Server access key (used for Vuforia Web Services API)
        'serverAccessKey': '6123c1b2883239a7c9b48b8c12242c0a82580066',

        // Server secret key (used for Vuforia Web Services API)
        'serverSecretKey': '84afd590c4a997b18c11dc77cc77b830f619b965',

        // Client access key (used for Vuforia Web Query API)
        'clientAccessKey': '6e098c7af8f4a5590c433f7182b5beab5cefd1f8',

        // Client secret key (used for Vuforia Web Query API)
        'clientSecretKey': 'f494db40da892957d9671cb498709a9c2c7bab10'
    });

    // util for base64 encoding and decoding
    var util = vuforia.util();

    var target = {

        // name of the target, unique within a database
        'name': TargetImagefile.filename,
        // width of the target in scene unit
        'width': 32.0,
        // the base64 encoded binary recognition image data
        'image': util.encodeFileBase64(TargetImagefile.localPath + TargetImagefile.filename),
        // indicates whether or not the target is active for query
        'active_flag': true,
        // the base64 encoded application metadata associated with the target
        'application_metadata': util.encodeBase64('some metadata about your image')
    };

    client.addTarget(target, function (error, result) {

        if (error) { // e.g. [Error: AuthenticationFailure]
            res.status(500).send('error');
            console.error(result);

            /*
            example of result from the vws API:
            {
                result_code: 'AuthenticationFailure',
                transaction_id: '58b51ddc7a2c4ac58d405027acf5f99a'
            }
            */

        } else {

            console.log(result);
            res.status(200).send("successfull");


            /*
            example of result from the vws API:
            {
                target_id: '93fd6681f1r74b76bg80tf736a11b6a9',
                result_code: 'TargetCreated',
                transaction_id: 'xf157g63179641c4920728f1650d1626'
            }
            */
        }
    });


    // console.log(TargetImagefile);
    // console.log(videoAr)

    // req.body.metadata.arfile = req.body.metadata.arfile.replace(/^data:(.*?);base64,/, ""); // <--- make it any type
    // req.body.metadata.arfile = req.body.metadata.arfile.replace(/ /g, '+'); // <--- this is important

    // fs.writeFile(`${p}${filename}`, req.body.metadata.arfile, 'base64', function (err) {
    //     console.log(err);
    // });


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
    const localPath = `${uploadPath}/ArContent/ArVideos/`;
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
    if (!fs.existsSync(`${uploadPath}/ArContent/ArVideos/`)) {
        fs.mkdirSync(`${uploadPath}/ArContent/ArVideos/`);
    }
    if (!fs.existsSync(localPath)) {
        fs.mkdirSync(localPath);
    }
    fs.writeFileSync(localPath + filename, base64Data, 'base64');
    return { filename, localPath };
}


module.exports = router;