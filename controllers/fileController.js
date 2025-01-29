const query = require('../models/usersQueries');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
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
  const uploadResult = await cloudinary.uploader.upload(req.file.path);
  console.log(uploadResult);
  await query.createFile(name, uploadResult.public_id, Number(req.params.id));
  const folder = await query.findOnefolderPosts(Number(req.params.id));
  res.render('folderFiles', { folder: folder });
}

async function getShowFile(req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any

  const file = await query.findOnePost(Number(req.params.id));
  const url = cloudinary.url(file.publicId);
  res.render('showFile', { file: file });
}

async function postShowFile(req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  const file = await query.findOnePost(Number(req.params.id));
  const url = cloudinary.url(file.publicId, {
    sign_url: true, // Sign the URL for private access
    expires_at: Math.floor(Date.now() / 1000) + 60, // Expires in 1 minute
  });
  console.log(url);
  res.redirect(url);
}

async function postDeleteFile(req, res) {
  const file = await query.findOnePost(Number(req.params.id));
  await query.deleteFile(Number(req.params.id));
  res.redirect(`/file/${file.folderId}/readfolder`);
}

module.exports = {
  upload,
  getUpload,
  postUpload,
  getShowFile,
  postShowFile,
  postDeleteFile,
};
