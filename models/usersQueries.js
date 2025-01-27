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
  console.log(user);
  return user;
}

async function findEmail(email) {
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });
  console.log(user);
  return user;
}

async function findId(id) {
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });
  console.log(user);
  return user;
}

module.exports = {
  createUser,
  findEmail,
  findId,
};
