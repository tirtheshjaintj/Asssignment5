const { validationResult } = require("express-validator");
const { AppError } = require("../helpers/error.helper.js");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //console.log(errors.array());
        throw new AppError(errors.array()[0].msg, 400);
    }
    next();
};

module.exports = validate;
