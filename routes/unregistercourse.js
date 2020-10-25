const express = require('express');
// const Course = require('../models/Course');
const RegisterCourse = require('../models/RegisterCourse');
const auth = require('../middlewares/auth');
const router = express.Router();

/**
 * @route DELETE / api/course
 * @description remove course
 * @access Private
 */
router.delete('/:id', auth, async (req, res) => {

    try {

        // const courseUnRegister = await RegisterCourse.findOne({ course_id: req.params.id });
        const courseId = req.params.id;

        const courseUnRegister = await RegisterCourse.find({ course_id: courseId });
        console.log(courseUnRegister)
        // if (!courseUnRegister) return res.status(404).json({ msg: 'Course with this id does not exists' });

        // Make sure user owns course
        // if (courseUnRegister.learner_id.toString() !== req.user.id)
        //     return res.status(401).json({ msg: 'Not authorized' });
        // await RegisteredCourse.findByIdAndRemove(req.params.id);
        // res.status(200).send('Course successfully unregistered');

    } catch (err) {
        console.log(err)
        res.status(500).send('Server error');
    }

});

module.exports = router;