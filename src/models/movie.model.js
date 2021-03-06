module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    'Movie',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      tt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      director: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      actors: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'movies',
      underscored: true,
    },
  );

  Movie.associate = function associate(models) {
    models.Movie.hasMany(models.Score, {
      as: 'scores',
      foreignKey: 'movie_id',
    });
    models.Movie.belongsToMany(models.Genre, {
      through: 'genres_movies',
      as: 'genres',
      foreignKey: 'movie_id',
    });
  };

  return Movie;
};
