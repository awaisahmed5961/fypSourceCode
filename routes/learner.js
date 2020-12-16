const express = require('express');
const Joi = require('@hapi/joi');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Learner = require('../models/Learner');
const auth = require('../middlewares/auth');
const fs = require('fs');
const path = require('path');


router.post('/', async (req, res) => {
    // Validating the Request body 
    let { error } = learnerValidationSchema.validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    // Pulling required Information from the Request 
    const { name, email, password } = req.body;

    try {
        // Find User already exists or not
        const isRegistered = await Learner.findOne({ email });

        if (isRegistered) {
            res.status(400).send('User Already Exists');
        }

        user = new Learner({
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

        // creating payload for jwt
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
            res.json({ token, joinDate: user.joinDate });
        });


    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
});

router.put('/:id', auth, async (req, res) => {
    // Validating the Request body 
    let { error } = updatelearnerValidationSchema.validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }

    const { name, email, imageAvatar } = req.body
    // Build contact object
    const updateLearner = {};
    if (name) updateLearner.name = name;

    if (imageAvatar) {
        var profileImage = saveImage(imageAvatar);
        console.log(profileImage.filename);
        console.log(profileImage.localPath)
        updateLearner.imageAvatar = profileImage.localPath + profileImage.filename;
    };

    try {
        console.log(req.user.id);
        console.log("rest")
        var learner = await Learner.findByIdAndUpdate(
            req.user.id,
            { $set: updateLearner },
            { new: true }
        );
        res.json(learner);

    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
});

function saveImage(baseImage) {
    /*path of the folder where your project is saved. (In my case i got it from config file, root path of project).*/
    const uploadPath = path.resolve();
    //path of folder where you want to save the image.
    const localPath = `https://guarded-shelf-88919.herokuapp.com/uploads/learnerprofiles/`;
    //Find extension of file
    const ext = baseImage.substring(baseImage.indexOf("/") + 1, baseImage.indexOf(";base64"));
    const fileType = baseImage.substring("data:".length, baseImage.indexOf("/"));
    //Forming regex to extract base64 data of file.
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
    //Extract base64 data.
    const base64Data = baseImage.replace(regex, "");
    const rand = Math.ceil(Math.random() * 1000);
    //Random photo name with timeStamp so it will not overide previous images.
    const filename = `learner_${Date.now()}_${rand}.${ext}`;

    //Check that if directory is present or not.
    if (!fs.existsSync(`${uploadPath}/uploads/learnerprofiles/`)) {
        fs.mkdirSync(`${uploadPath}/uploads/learnerprofiles/`);
    }
    if (!fs.existsSync(localPath)) {
        fs.mkdirSync(localPath);
    }
    fs.writeFileSync(localPath + filename, base64Data, 'base64');
    return { filename, localPath };
}

// Schema Validation 
const learnerValidationSchema = Joi.object({
    name: Joi.string().min(1).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().max(20),
});

const updatelearnerValidationSchema = Joi.object({
    name: Joi.string().min(1).max(15).required(),
    email: Joi.string().email().required(),
    imageAvatar: Joi.string()
});

module.exports = router;