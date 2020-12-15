const express = require('express');
const Course = require('../models/Course');
const RegisterCourse = require('../models/RegisterCourse');
const Joi = require('@hapi/joi');
const auth = require('../middlewares/auth');
Joi.objectId = require('joi-objectid')(Joi)
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.resolve();
        //path of folder where you want to save the image.
        const localPath = `${uploadPath}/uploads/`;
        cb(null, localPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
});

const router = express.Router();

/**
 * @route GET/ api/courses
 * @description Get List of courses
 * @access Private
 */
router.get('/', auth, async (req, res) => {
    const course = await Course
        .find({ educator_id: req.user.id })
        .populate('educator_id', '-password')
        .sort('date');
    res.send(course);
});
/**
 * @route GET/ api/courses
 * @description Get single of courses
 * @access Private
 */
router.get('/:id', auth, async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        res.status(404).send('Ooops required Course is not existing in the server');
        return;
    }
    res.send(course);
});

/**
 * @route POST / api/courses
 * @description Add course
 * @access Private
 */
router.post('/', auth, upload.single('file'), async (req, res) => {
    let { error } = courseValidationSchema.validate(req.body);
    if (error) { console.log(error); return res.status(400).send(error.details[0].message) }
    // Pulling required Information from the Request 
    const { title, subTitle, description, } = req.body;

    try {
        // Creation object of the Course Model
        course = new Course({
            title,
            subTitle,
            description,
            educator_id: req.user.id,
            ImagePlaceholder: (req.file && req.file.path
                ?
                `https://guarded-shelf-88919.herokuapp.com/api/uploads/${req.file.filename}`
                :
                // 'https://images.unsplash.com/photo-1517147177326-b37599372b73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2229&q=80')
                'https://guarded-shelf-88919.herokuapp.com/api/uploads/list placeholder.jpg')
        });

        await course.save();

        res.status(200).send(course);
    }
    catch (error) {
        res.status(500).send('Server Error');
    }
});

/**
 * @route Put / api/courses/:id
 * @description update course
 * @access Private
 */
router.put('/:id', auth, async (req, res) => {

    const { title, subTitle, description, publication_Status } = req.body;

    // Build contact object
    const updatedCourse = {};
    if (title) updatedCourse.title = title;
    if (subTitle) updatedCourse.subTitle = subTitle;
    if (description) updatedCourse.description = description;
    if (publication_Status) updatedCourse.publication_Status = publication_Status;

    console.log(req.param.id)
    try {

        let course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ msg: 'Course not found' });

        // Make sure user owns contact
        if (course.educator_id.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Not authorized' });

        course = await Course.findByIdAndUpdate(
            req.params.id,
            { $set: updatedCourse },
            { new: true }
        );

        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

/**
 * @route DELETE / api/course
 * @description remove course
 * @access Private
 */
router.delete('/:id', auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ msg: 'Course with this id does not exists' });
        // Make sure user owns course
        if (course.educator_id.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Not authorized' });

        // RegisterCourse.deleteMany({ course_id: req.params.id }).then((d) => {
        //     console.log(d.deletedCount);
        // });
        await Course.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: 'Course removed' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

// Schema Validation 
const courseValidationSchema = Joi.object({
    title: Joi.string()
        .min(1).max(50).required(),
    subTitle: Joi.string().min(1).max(50).required(),
    description: Joi.string().required().max(300),
    file: Joi.string(),
    date: Joi.date(),
    educator_id: Joi.objectId()
});
module.exports = router;