const query = require('../models/usersQueries');
const { body, validationResult } = require('express-validator');

const lengthErr = 'must be between 1 and 20 characters.';
const emailERR = 'must be a valid email(example: name@gmail.com)';
const emptyERR = 'must not be empty';
const validateLogin = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage(`Email ${emptyERR}`)
    .isEmail()
    .withMessage(`Email ${emailERR}`)
    .custom(async (value) => {
      console.log('Checking email:', value); // Log the email being checked
      const existingUser = await query.findEmail(value);
      console.log('Existing User:', existingUser); // Log the result from the query
      if (!existingUser) {
        console.log('User does not exist!');
        throw new Error('this e-mail address does not exists Sign Up Now');
      }
      return true;
    }),

  body('password')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`password ${lengthErr}`),
];

async function getLogin(req, res) {
  res.render('login');
}

async function postLogin(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('login', {
      errors: errors.array(),
    });
  }
}
module.exports = {
  validateLogin,
  getLogin,
  postLogin,
};
