const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const {createEmailSchema} = require("../middleware/validators/emailValidator.middleware");






router.post('/', createEmailSchema, awaitHandlerFactory(emailController.createEmail)); // localhost:3000/api/v1/users

//
// /* GET newsletter listing. */
// router.get('/', function (req, res, next) {
//   let resultResp = null;
//   res.send(resultResp);
// });
//
// router.post('/', function (req, res, next) {
//   const email = req.body.email;
//   if (email && validator.validate(email)) {
//     let result = insertEmail(email);
//     if (result.status === 400) {
//       res.status(400).send({error: result.msg});
//       return;
//     } else {
//       res.status(result.status).send(result.msg);
//       return;
//     }
//   }
//   res.status(400).send({error: 'Invalid email address!'});
// });
//
//
// function insertEmail(email) {
//   let exists = false;
//   const connection = mysql.createConnection({
//     host: 'mysql',
//     user: 'root',
//     password: 'password',
//     port: 3306,
//     database: 'email',
//   });
//
//   const sqlQuerySEL = "SELECT id from email WHERE email = '" + email + "'";
//   connection.query(sqlQuerySEL, function (err, results) {
//     if (err) throw err;
//     console.log("test")
//     console.log(results)
//     console.log(results.length)
//     if (results.length !== 0) return {"status": 400, "msg": "Email already exists."};
//     const sqlQueryINS = "INSERT INTO email VALUES ( '" + uuid.v4() + "' , '" + email + "' )";
//     connection.query(sqlQueryINS, function (err, result) {
//       if (err) throw err;
//       console.log("1 record inserted, ID: " + result.id);
//       return {"status": 201};
//     });
//   });
// }

module.exports = router;
