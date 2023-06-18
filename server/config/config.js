require("dotenv").config();

const db = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,
  dialectOptions: {
    options: {
      requestTimeout: 1000000,
      connectTimeout: 1000000,
    },
  },
  define: {
    underscored: true,
    freezeTableName: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  },
};
module.exports = db;
