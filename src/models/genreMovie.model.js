module.exports = (sequelize, DataTypes) => {
  const GenreMovie = sequelize.define(
    'GenreMovie',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      genre_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      movie_id: {
        type: DataTypes.UUID,
        allowNull: false,
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
      tableName: 'genres_movies',
      underscored: true,
    },
  );

  GenreMovie.associate = function associate(models) {
    models.GenreMovie.belongsTo(models.Movie, {
      foreignKey: 'movie_id',
      as: 'movies',
    });

    models.GenreMovie.belongsTo(models.Genre, {
      foreignKey: 'genre_id',
      as: 'genres',
    });
  };

  return GenreMovie;
};
