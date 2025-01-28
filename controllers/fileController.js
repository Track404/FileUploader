const query = require('../models/usersQueries');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Users/track404/Documents/OdinProject/FileUploader/storage');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

async function getUpload(req, res) {
  const folders = await query.findFolders();

  res.render('message', {
    folders: folders,
  });
}
async function postUpload(req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  const folders = await query.findFolders();

  res.render('message', {
    sucessSend: ' ',
    folders: folders,
  });
}

module.exports = {
  upload,
  getUpload,
  postUpload,
};
