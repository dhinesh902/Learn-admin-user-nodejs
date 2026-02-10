import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: true,
  },
);

const databaseConnection = async () => {
  try {
    await connection.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error", error);
  }
};

export { connection, databaseConnection };
