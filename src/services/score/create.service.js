const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../helpers');
const { ApplicationError } = require('../../utils');
const { movieRepository, scoreRepository } = require('../../repositories');

const db = require('../../models');

module.exports = {
  create: async params => {
    const { id, loginUser } = params;
    const findMovie = await movieRepository.findOne({ id });
    const findUserScore = await scoreRepository.find({
      user_id: loginUser.id,
      movie_id: id,
    });

    if (!findMovie) {
      throw new ApplicationError(
        messages.notFound('movie'),
        StatusCodes.NOT_FOUND,
      );
    }

    if (findUserScore) {
      throw new ApplicationError(
        messages.alreadyExists('your vote'),
        StatusCodes.CONFLICT,
      );
    }

    const response = await db.sequelize.transaction(async transaction => {
      const newScore = {
        user_id: loginUser.id,
        movie_id: id,
        score: params.score,
      };

      const score = await scoreRepository.create(newScore, transaction);

      return score;
    });

    return response;
  },
};
