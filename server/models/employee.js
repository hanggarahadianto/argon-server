module.exports = function (sequelize, DataTypes) {
  return sequelize.define("employee", {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    auth_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: "auth",
        key: "id",
      },
    },
  });
};
