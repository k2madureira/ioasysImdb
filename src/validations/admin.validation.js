const { userRepository } = require('../repositories');

module.exports = {
  isAdmin: async id => {
    const findAdm = await userRepository.find({
      id,
      admin: true,
    });

    if (findAdm.length === 0) {
      return false;
    }
    return true;
  },
};
