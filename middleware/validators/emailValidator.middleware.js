const {body, check} = require('express-validator');

exports.createEmailSchema = [
  check('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email')
]
