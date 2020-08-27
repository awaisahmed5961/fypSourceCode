const express = require('express');

const Course = require('../models/Course');
const Joi = require('@hapi/joi');
const auth = require('../middlewares/auth');
Joi.objectId = require('joi-objectid')(Joi)

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
router.post('/', auth, async (req, res) => {

    let { error } = courseValidationSchema.validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    // Pulling required Information from the Request 
    const { title, subTitle, description } = req.body;

    try {
        // Creation object of the Course Model
        course = new Course({
            title,
            subTitle,
            description,
            educator_id: req.user.id
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
router.put('/:id', async (req, res) => {

    let { error } = courseValidationSchema.validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    // Pulling required Information from the Request 
    const { title, subTitle, description } = req.body;

    // Build contact object
    const updatedCourse = {};
    if (title) updatedCourse.title = title;
    if (subTitle) updatedCourse.subTitle = subTitle;
    if (description) updatedCourse.description = description;

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
    ImagePlaceholder: Joi.string(),
    date: Joi.date(),
    educator_id: Joi.objectId()
});
module.exports = router;