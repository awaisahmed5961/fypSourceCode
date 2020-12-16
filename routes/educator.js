const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const Educator = require('../models/Educator');
const auth = require('../middlewares/auth');
const fs = require('fs');
const path = require('path');


/**
 * @route POST/ api/user
 * @description Register a user
 * @access public
 */
router.post('/',
    async (req, res) => {

        const { name, email, password } = req.body;

        try {
            // Finding User In the Database
            let educator = await Educator.findOne({ email });

            if (educator) {
                return res.status(400).json({ msg: 'User Already Exist' });
            }

            // Creation object of the Educator Model
            user = new Educator({
                name,
                email,
                password
            });

            // Hasing password
            const salt = await bcrypt.genSalt(10);
            // hassing User password by providing planepassword and salt
            user.password = await bcrypt.hash(password, salt);

            // Saving User In the database
            await user.save();

            // Creating palyload for Json Web Token in this payload we simply add user id

            const payload = {
                user: {
                    id: user.id
                }
            }

            //Creating Jwt With payload and Secret Key 
            jwt.sign(payload, config.get('jwtSecret'), {
                // options
                expiresIn: 3600
            }, (err, token) => {
                if (err) {
                    throw err;
                }
                // returning token
                res.json({ token });
            });


        }
        catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    });


router.put('/:id', async (req, res) => {
    // Validating the Request body 
    let { error } = updateeducatorRequestbody.validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }

    const { name, email, imageAvatar } = req.body
    // Build contact object
    const updateEducator = {};
    if (name) updateEducator.name = name;
    if (email) updateEducator.email = email;

    if (imageAvatar) {
        var profileImage = saveImage(imageAvatar);
        console.log(profileImage)
        updateEducator.imageAvatar = profileImage.localPath + profileImage.filename;
    };

    try {

        var educator = await Educator.findByIdAndUpdate(
            req.params.id,
            { $set: updateEducator },
            { new: true }
        );
        res.json(educator);

    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
});

function saveImage(baseImage) {
    /*path of the folder where your project is saved. (In my case i got it from config file, root path of project).*/
    const uploadPath = path.resolve();
    //path of folder where you want to save the image.
    const localPath = `${uploadPath}/uploads/educatorprofiles/`;
    //Find extension of file
    const ext = baseImage.substring(baseImage.indexOf("/") + 1, baseImage.indexOf(";base64"));
    const fileType = baseImage.substring("data:".length, baseImage.indexOf("/"));
    //Forming regex to extract base64 data of file.
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
    //Extract base64 data.
    const base64Data = baseImage.replace(regex, "");
    const rand = Math.ceil(Math.random() * 1000);
    //Random photo name with timeStamp so it will not overide previous images.
    const filename = `educator_${Date.now()}_${rand}.${ext}`;

    //Check that if directory is present or not.
    if (!fs.existsSync(`${uploadPath}/uploads/educatorprofiles/`)) {
        fs.mkdirSync(`${uploadPath}/uploads/educatorprofiles/`);
    }
    if (!fs.existsSync(localPath)) {
        fs.mkdirSync(localPath);
    }
    fs.writeFileSync(localPath + filename, base64Data, 'base64');
    return { filename, localPath };
}
// Schema Validation 
const educatorValidationSchema = Joi.object({
    name: Joi.string().min(1).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().max(20),
});
const updateeducatorRequestbody = Joi.object({
    name: Joi.string().min(1).max(15).required(),
    email: Joi.string().email().required(),
    imageAvatar: Joi.string()
});

module.exports = router;