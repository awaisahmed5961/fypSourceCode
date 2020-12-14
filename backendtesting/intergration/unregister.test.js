const request = require('supertest');
const Course = require('../../models/Course');
const RegisterCourse = require('../../models/RegisterCourse');
const Learner = require('../../models/Learner');
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
let server = null;



describe('Course Registeration For Learner', () => {
    beforeEach(() => {
        server = require('../../server');
    });
    afterEach(() => {
        server.close();
    })
    describe('GET list of registerd course ', () => {
        var token = "";
        var user_id;
        var course_id;

        beforeEach(async () => {

            let dummyUser = {
                name: "awais",
                email: "awaisahmedtest123@gmail.com",
                password: "testawais123"
            }

            user = new Learner(dummyUser);

            const salt = await bcrypt.genSalt(10);
            // hassing User password by providing planepassword and salt
            user.password = await bcrypt.hash(dummyUser.password, salt);
            await user.save();

            // Creating palyload for Json Web Token in this payload we simply add user id

            const payload = {
                user: {
                    id: user.id
                }
            }


            token = jwt.sign(payload, config.get('jwtSecret'))
            user_id = user._id
        });
        afterEach(async () => {
            await Learner.collection.deleteMany({})
            await Course.remove({})
        });

        const exec = async () => {
            return await request(server)
                .delete(`/api/unregistercourse/${course_id}`)
                .set('x-auth-token', token);
        }

        it('should return 404 if course is not Registerd ', async () => {

            course_id = mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(404);
        })

        it('should return 200 if course is Un Registered ', async () => {
            const course = new Course({
                title: "test course 1",
                subTitle: "test course subtitle",
                description: "test course description",
                educator_id: user_id,
                ImagePlaceholder:
                    'https://guarded-shelf-88919.herokuapp.com/api/uploads/list placeholder.jpg',
            });
            await course.save();
            course_id = course._id;

            // Creation object of the RegisterCourse Model
            const registerCourse = new RegisterCourse({
                course_id: course_id,
                learner_id: user_id
            });

            await registerCourse.save();

            const res = await exec();
            expect(res.status).toBe(200);
        })
    });

})
