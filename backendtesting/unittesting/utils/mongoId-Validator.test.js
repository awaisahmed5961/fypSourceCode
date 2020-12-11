const validate = require('../../../util/mangoId-Validator');
const mongoose = require('mongoose');

describe("utility function testing", () => {
    it('should return true if mongo Id is valid', () => {
        expect(validate(mongoose.Types.ObjectId())).toBeTruthy();
    });
});

