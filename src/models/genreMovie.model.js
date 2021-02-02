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

  return GenreMovie;
};
