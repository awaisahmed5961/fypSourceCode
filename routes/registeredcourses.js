const express = require('express');

const RegisterCourse = require('../models/RegisterCourse');
const Joi = require('@hapi/joi');
const auth = require('../middlewares/auth');
Joi.objectId = require('joi-objectid')(Joi)
const Course = require('../models/Course');
const router = express.Router();

/**
 * @route GET/ api/registerd courses
 * @description Get List of registerdcourses
 * @access Private
 */
router.get('/', auth, async (req, res) => {
    const listOfCourses = await RegisterCourse
        .find({ learner_id: req.user.id })
        .populate('course_id', '-_id -ImagePlaceholder ')
        .populate({
            path: 'course_id',
            populate: {
                path: 'educator_id',
                model: 'educator',
                select: 'name  email  _id'
            }
        })
    res.send(listOfCourses);
});
/**
 * @route GET/ api/specificRegisteredcourses
 * @description Get single of courses
 * @access Private
 */
router.get('/:id', auth, async (req, res) => {
    const course = await RegisterCourse.find({ course_id: req.params.id });
    if (!course) {
        return res.status(404).send('Ooops no register course found with this id');

    }
    return res.send(course);
});

/**
 * @route POST / api/courses
 * @description Add course
 * @access Private
 */
router.post('/', auth, async (req, res) => {

    let { error } = RegistercourseSchemaValidation.validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    // Pulling required course Id from the Request 
    const { course_id } = req.body;

    const course = await Course.findById(course_id);
    if (!course) {
        res.status(404).send('Ooops no course with this detail is found');
        return;
    }

    const alreadyRegistered = await RegisterCourse.findOne({ course_id: course_id, learner_id: req.user.id });
    // res.send(alreadyRegistered)
    if (alreadyRegistered) {
        res.status(401).send('Course already registered')
    }
    else {
        if (course.publication_Status === 1) {
            try {

                // Creation object of the RegisterCourse Model
                registerCourse = new RegisterCourse({
                    course_id,
                    learner_id: req.user.id
                });

                await registerCourse.save();

                res.status(200).send(registerCourse);
            }
            catch (error) {
                res.status(500).send('Server Error');
            }
        }
        else {
            res.status(401).send('Course is not published and you can not register untill the course is published')
        }

    }


});


/**
 * @route DELETE / api/course
 * @description remove course
 * @access Private
 */
router.delete('/:id', auth, async (req, res) => {
    try {

        const course = await RegisterCourse.findById(req.params.id);
        if (!course) return res.status(404).json({ msg: 'Course with this id does not exists' });

        // Make sure user owns course
        // if (course.learner_id.toString() !== req.user.id)
        //     return res.status(401).json({ msg: 'Not authorized' });

        await RegisterCourse.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: 'Course removed' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    res.send('unregister course')

});

// Schema Validation 
const RegistercourseSchemaValidation = Joi.object({
    learner_id: Joi.objectId(),
    course_id: Joi.objectId().required(),
    educator_id: Joi.objectId()
});
module.exports = router;