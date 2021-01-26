const { hash } = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        field: 'password_hash',
        allowNull: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
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
      tableName: 'users',
      underscored: true,
    },
  );

  User.beforeSave(async (user, options) => {
    const password = await hash(user.password, 8);
    if (user.changed('password')) {
      Object.assign(user, { password });
    }
    return user;
  });

  User.beforeUpdate(async (user, options) => {
    const password = await hash(user.password, 8);
    if (user.changed('password')) {
      Object.assign(user, { password });
    }
    return user;
  });

  User.prototype.toJSON = function () {
    const user = { ...this.get() };
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !['password'].includes(key)),
    );
  };

  return User;
};
