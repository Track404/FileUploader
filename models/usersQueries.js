const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createUser(username, email, password) {
  const user = await prisma.users.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });
  return user;
}

async function findEmail(email) {
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}

async function findId(id) {
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });

  return user;
}

async function createFolder(name, userId) {
  const folder = await prisma.folder.create({
    data: {
      name: name,
      usersId: userId,
    },
  });

  return folder;
}

async function updateFolder(name) {
  const folder = await prisma.folder.update({
    where: {
      name: name,
    },
    data: {
      name: name,
    },
  });

  return folder;
}

async function findFolders() {
  const folders = await prisma.folder.findMany();
  return folders;
}

async function findOnefolder(id) {
  const folder = await prisma.folder.findUnique({
    where: {
      id: id,
    },
  });
  return folder;
}

async function updateFolder(id, name) {
  const folder = await prisma.folder.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });
  return folder;
}

async function deleteFolder(id) {
  const folder = await prisma.folder.delete({
    where: {
      id: id,
    },
  });
  return folder;
}

async function findOnefolderPosts(id) {
  const folder = await prisma.folder.findUnique({
    where: {
      id: id,
    },
    include: {
      files: true,
    },
  });
  return folder;
}

async function createFile(name, publicId, folderId) {
  const folder = await prisma.file.create({
    data: {
      filename: name,
      publicId: publicId,
      folderId: folderId,
    },
  });

  return folder;
}

async function findOnePost(id) {
  const file = await prisma.file.findUnique({
    where: {
      id: id,
    },
  });
  return file;
}

async function deleteFile(id) {
  const file = await prisma.file.delete({
    where: {
      id: id,
    },
  });
  return file;
}

async function deleteAllFile() {
  const deleteUsers = await prisma.file.deleteMany({});
  return deleteUsers;
}
module.exports = {
  createUser,
  findEmail,
  findId,
  createFolder,
  findOnefolder,
  findFolders,
  updateFolder,
  deleteFolder,
  findOnefolderPosts,
  createFile,
  findOnePost,
  deleteFile,
  deleteAllFile,
};
