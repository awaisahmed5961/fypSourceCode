const Educator = require('../../models/Educator')
const Course = require('../../models/Educator')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const config = require("config");
const request = require("supertest")
describe(' Auth middleware middleware ', () => {
    beforeEach(() => {
        server = require('../../server');
    });
    afterEach(() => {
        server.close();
    })

    describe('POST Course', () => {
        var user_id = null
        var token = "";
        let courseObj;


        beforeEach(async () => {

            courseObj = {
                title: "test course 1",
                subTitle: "test course subtitle",
                description: "test course description",
                educator_id: user_id,
                ImagePlaceholder:
                    'https://guarded-shelf-88919.herokuapp.com/api/uploads/list placeholder.jpg',
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
        });

        const exec = async () => {
            return await request(server)
                .post('/api/courses')
                .set('x-auth-token', token)
                .send(courseObj);

        }

        it("should return 401 if User is not Authentication", async () => {
            token = "";
            const res = await exec();
            expect(res.status).toBe(401)
        });
        it("should return 401 if invalid token is provided", async () => {
            token = "a";
            const res = await exec();
            expect(res.status).toBe(401)
        });
    })
})

