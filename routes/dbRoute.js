const { Router } = require('express');
const signUpController = require('../controllers/signUpController');
const loginController = require('../controllers/loginController');
const fileController = require('../controllers/fileController');
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
    successRedirect: '/file',
    failureRedirect: '/login',
  })
);

dbRouter.get('/file', (req, res) => {
  res.render('message');
});

dbRouter.post(
  '/file',
  fileController.upload.single('avatar'),
  fileController.postUpload
);
module.exports = dbRouter;
