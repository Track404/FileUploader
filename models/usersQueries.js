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

module.exports = {
  createUser,
  findEmail,
  findId,
  createFolder,
  findOnefolder,
  findFolders,
  updateFolder,
  deleteFolder,
};
