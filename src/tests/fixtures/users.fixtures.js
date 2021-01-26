const faker = require('faker');

const { userRepository } = require('../../repositories');

const password = 'PASSW0RD';

const sampleUsers = [
  {
    name: faker.name.findName(),
    nickname: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password,
  },
  {
    name: faker.name.findName(),
    nickname: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password,
  },
  {
    name: faker.name.findName(),
    nickname: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password,
  },
];

const createSampleUser = async () => {
  const sampleUser = {
    name: faker.name.findName(),
    nickname: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password,
  };

  return userRepository.create(sampleUser);
};

const createSampleUsers = async () => {
  const promises = [];
  sampleUsers.forEach(user => {
    promises.push(userRepository.create(user));
  });

  await Promise.all(promises);
};

module.exports = {
  sampleUsers,
  createSampleUser,
  createSampleUsers,
};
