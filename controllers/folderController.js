const query = require('../models/usersQueries');

async function showFolders(req, res) {
  const folders = await query.findFolders();
  res.render('listFolders', {
    folders: folders,
    username: req.user.username,
  });
}

async function getAddFolder(req, res) {
  res.render('addfolder');
}

async function postAddFoler(req, res) {
  const { foldername } = req.body;
  await query.createFolder(foldername, req.user.id);
  res.redirect('/file');
}

async function getUpdateFolder(req, res) {
  const folder = await query.findOnefolder(Number(req.params.id));
  res.render('updateFolder', { folder: folder });
}

async function postUpdateFolder(req, res) {
  const { foldername } = req.body;
  const folder = await query.updateFolder(Number(req.params.id), foldername);
  res.redirect('/file');
}

async function postDeleteFolder(req, res) {
  await query.deleteFolder(Number(req.params.id));
  res.redirect('/file');
}

async function readFileFolder(req, res) {
  const folder = await query.findOnefolderPosts(Number(req.params.id));
  console.log(folder);
  res.render('folderFiles', { folder: folder });
}
module.exports = {
  getAddFolder,
  postAddFoler,
  getUpdateFolder,
  postUpdateFolder,
  postDeleteFolder,
  showFolders,
  readFileFolder,
};
