const EmailModel = require('../models/email.model');
const HttpException = require('../utils/HttpException.utils');
const {validationResult} = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();


class EmailController {
  createEmail = async (req, res, next) => {
    this.checkValidation(req);
    const exists = await EmailModel.findOne({email: req.body.email});
    if (exists)
      throw new HttpException(400, 'Email already registered')

    const result = await EmailModel.create(req.body);

    if (!result)
      throw new HttpException(500, 'Something went wrong');

    res.status(201).send('User was created!');
  };
  checkValidation = (req) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new HttpException(400, 'Validation failed', errors);
    }
  }
}

module.exports = new EmailController();

