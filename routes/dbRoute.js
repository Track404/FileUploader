const { Router } = require('express');
const signUpController = require('../controllers/signUpController');
const loginController = require('../controllers/loginController');
const fileController = require('../controllers/fileController');
const folderController = require('../controllers/folderController');
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

dbRouter.get('/file', folderController.showFolders);

dbRouter.get('/file/:id/addfile', fileController.getUpload);

dbRouter.post(
  '/file/:id/addfile',
  fileController.upload.single('avatar'),
  fileController.postUpload
);

dbRouter.get('/file/addfolder', folderController.getAddFolder);
dbRouter.post('/file/addfolder', folderController.postAddFoler);
dbRouter.get('/file/:id/updatefolder', folderController.getUpdateFolder);
dbRouter.post('/file/:id/updatefolder', folderController.postUpdateFolder);
dbRouter.post('/file/:id/deletefolder', folderController.postDeleteFolder);
dbRouter.get('/file/:id/readfolder', folderController.readFileFolder);

module.exports = dbRouter;
