const { Router } = require('express');
const signUpController = require('../controllers/signUpController');
const loginController = require('../controllers/loginController');
const passport = require('passport');
const dbRouter = Router();

dbRouter.get('/sign-up', signUpController.getSignUp);
dbRouter.post(
  '/sign-up',
  signUpController.validateUser,
  signUpController.postSignUp
);

dbRouter.get('/login', loginController.getLogin);
dbRouter.post(
  '/login',
  loginController.validateLogin,
  passport.authenticate('local', {
    successRedirect: '/message',
    failureRedirect: '/login',
  })
);

dbRouter.get('/message', (req, res) => {
  res.render('message');
});
module.exports = dbRouter;
