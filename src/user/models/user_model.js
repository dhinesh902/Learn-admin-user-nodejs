import { DataTypes, Model } from "sequelize";
import { connection } from "../../../connections.js";

class UserModel extends Model {}

UserModel.init(
  {
    userid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: connection,
    modelName: "UserModel",
    tableName: "users",
  },
);

export { UserModel };
