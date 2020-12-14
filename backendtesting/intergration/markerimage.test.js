const request = require('supertest');

let server = null;

describe('Ar Content ', () => {
    beforeEach(() => {
        server = require('../../server');
    });
    afterEach(() => {
        server.close();
    })
    describe('it will store marker image to the folder ', () => {
        const exec = async () => {
            return await request(server)
                .post("/api/markerimages")
                .send({
                    Image: "hello Image",
                    metadata: {
                        type: "video",
                        fileData: "videofile"
                    }
                })
        }
        it("sholud save the target image to the upload folder", async () => {
            const res = await exec();
            expect(res.status).toBe(200);
        })
    });
})
