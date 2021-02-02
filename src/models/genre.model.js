module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    'Genre',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
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
      tableName: 'genres',
      underscored: true,
      paranoid: true,
    },
  );

  Genre.associate = function associate(models) {
    models.Genre.belongsToMany(models.Movie, {
      through: 'genres_movies',
      as: 'genres',
      foreignKey: 'genre_id',
    });
  };

  return Genre;
};
