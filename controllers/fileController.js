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
  const folders = await query.findOnefolder(Number(req.params.id));
  console.log(folders);
  res.render('addFile', {
    folders: folders,
  });
}
async function postUpload(req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  const name = req.file.filename;

  console.log(req.file.filename);
  await query.createFile(name, Number(req.params.id));
  const folder = await query.findOnefolderPosts(Number(req.params.id));
  res.render('folderFiles', { folder: folder });
}

module.exports = {
  upload,
  getUpload,
  postUpload,
};
