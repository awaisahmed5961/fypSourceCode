const request = require('supertest');
const Course = require('../../models/Course');
const Educator = require('../../models/Educator')
const Topic = require('../../models/Topic')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
let server = null;



describe('/api/coursestopics', () => {
    beforeEach(() => {
        server = require('../../server');
    });
    afterEach(() => {
        server.close();
    })
    describe('GET /', () => {

        var token = "";
        var course_id;
        var user_id;
        beforeEach(async () => {

            let dummyUser = {
                name: "awais",
                email: "awaisahmedtest123@gmail.com",
                password: "testawais123"
            }

            user = new Educator(dummyUser);

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
            await Educator.collection.deleteMany({})
            await Course.remove({})
        });

        const exec = async () => {
            return await request(server)
                .get('/api/coursetopics')
                .set('x-auth-token', token)
                .set('course_id', course_id)


        }

        it('should return 400 if course id is not provide in the header or  if course id is invalid', async () => {

            const course = new Course({
                title: "test course 1",
                subTitle: "test course subtitle",
                description: "test course description",
                educator_id: user_id,
                ImagePlaceholder:
                    'https://guarded-shelf-88919.herokuapp.com/api/uploads/list placeholder.jpg',
            });
            await course.save();
            course_id = "123"

            const res = await exec();
            expect(res.status).toBe(400);
        })
        it('should return list of courses', async () => {

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

            const res = await exec();
            expect(res.status).toBe(200);
        })
    });

    describe('GET /:id', () => {
        var user_id;
        var token = "";
        var topic_id = null
        var course_id = null

        beforeEach(async () => {

            let dummyUser = {
                name: "awais",
                email: "awaisahmedtest123@gmail.com",
                password: "testawais123"
            }

            user = new Educator(dummyUser);

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
            user_id = user._id;
        });
        afterEach(async () => {
            await Educator.collection.deleteMany({})
            await Course.remove({});
        });

        let exec = async () => {
            return await request(server)
                .get(`/api/coursetopics/${topic_id}`)
                .set('x-auth-token', token)

        }

        it('should return a single topic', async () => {
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

            topic = new Topic(
                {
                    course_id: course_id,
                    TopicTitle: "topic 1",
                    TopicDescription: "topic desc"
                }
            );
            await topic.save();
            topic_id = topic._id;

            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("_id")
        })
    });

    describe('POST /', () => {
        var user_id = null;
        var token = "";
        let topicObj = null;

        const exec = async () => {
            return await request(server)
                .post('/api/coursetopics/')
                .set('x-auth-token', token)
                .send(topicObj);

        }

        beforeEach(async () => {

            topicObj = {
                course_id: mongoose.Types.ObjectId(),
                TopicTitle: "add topic title",
                TopicDescription: "topic description"
            }

            let dummyUser = {
                name: "awais",
                email: "awaisahmedtest123@gmail.com",
                password: "testawais123"
            }

            user = new Educator(dummyUser);

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
            await Course.collection.deleteMany({})
            // clearEducatorFromDb()
            await Educator.collection.deleteMany({})
            await Topic.collection.deleteMany({})
        });

        it("should return 401 if Educator is not logged in", async () => {
            token = "";
            const res = await exec();
            expect(res.status).toBe(401)
        });

        it("should return 400 if Topic title is invalid", async () => {

            topicObj = {
                course_id: "",
                TopicTitle: "",
                TopicDescription: ""
            }
            const res = await exec();
            expect(res.status).toBe(400)

        });
        it("should return 404 if course is invalid or not found", async () => {
            const res = await exec();
            expect(res.status).toBe(404)

        });

        it("should return 200 if topic is valid && Educator is Authenticated", async () => {

            const course = new Course({
                title: "test course 1",
                subTitle: "test course subtitle",
                description: "test course description",
                educator_id: new Array(user_id),
                ImagePlaceholder:
                    'https://guarded-shelf-88919.herokuapp.com/api/uploads/list placeholder.jpg',
            });
            await course.save();
            topicObj.course_id = course._id;

            const res = await exec();
            expect(res.status).toBe(200)
            expect(course).not.toBeNull();


        });

        it("should return topic if topic is save in database", async () => {

            const course = new Course({
                title: "test course 1",
                subTitle: "test course subtitle",
                description: "test course description",
                educator_id: new Array(user_id),
                ImagePlaceholder:
                    'https://guarded-shelf-88919.herokuapp.com/api/uploads/list placeholder.jpg',
            });
            await course.save();
            topicObj.course_id = course._id;


            const res = await exec();
            expect(res.body).toHaveProperty('_id');


        });
    })

    describe('PUT/:id', () => {
        var user_id;
        var token = "";
        var topic_id = null
        beforeEach(async () => {

            let dummyUser = {
                name: "awais",
                email: "awaisahmedtest123@gmail.com",
                password: "testawais123"
            }

            user = new Educator(dummyUser);

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
            user_id = user._id;
        });
        afterEach(async () => {
            await Educator.collection.deleteMany({})
            await Topic.collection.deleteMany({})
        });

        let exec = async () => {
            return await request(server)
                .put(`/api/coursetopics/${topic_id}`)
                .set('x-auth-token', token)
                .send({ course_id: mongoose.Types.ObjectId(), TopicTitle: "update title", TopicDescription: "update description" })

        }
        it('should return 404 if topic is not found', async () => {

            topic_id = mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(404);
        })
        it('should return 200 if topic is updated', async () => {
            const topic = new Topic(
                {
                    course_id: mongoose.Types.ObjectId(),
                    TopicTitle: "topic 1",
                    TopicDescription: "topic desc"
                }
            );
            await topic.save()
            topic_id = topic._id;
            const res = await exec();
            expect(res.status).toBe(200);
        })
    });

    describe('DELETE/:id', () => {
        var user_id;
        var token = "";
        var topic_id = null

        beforeEach(async () => {

            let dummyUser = {
                name: "awais",
                email: "awaisahmedtest123@gmail.com",
                password: "testawais123"
            }
            user = new Educator(dummyUser);
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
            user_id = user._id;
        });
        afterEach(async () => {
            await Educator.collection.deleteMany({})
        });

        let exec = async () => {
            return await request(server)
                .delete(`/api/coursetopics/${topic_id}`)
                .set('x-auth-token', token)

        }
        it('should return 404 if topic is not found', async () => {

            topic_id = mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(404);
        })
        it('should return 200 if topic is deleted', async () => {
            const topic = new Topic(
                {
                    course_id: mongoose.Types.ObjectId(),
                    TopicTitle: "topic 1",
                    TopicDescription: "topic desc"
                }
            );
            await topic.save()
            topic_id = topic._id;
            const res = await exec();
            expect(res.status).toBe(200);
        })

    });


})
