import { DataTypes, Model } from "sequelize";
import { connection } from "../../../connections.js";

class BusinessModel extends Model {}

BusinessModel.init(
  {
    businessid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    businessname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdby: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: "business",
    modelName: "BusinessModel",
    timestamps: true,
  },
);

class ProductModel extends Model {}

ProductModel.init(
  {
    productid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: 0,
    },
    productimg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    price: { type: DataTypes.DECIMAL, allowNull: true },
    unit: { type: DataTypes.INTEGER, defaultValue: 1 },
    availablerent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdby: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "ProductModel",
    tableName: "products",
    timestamps: true,
  },
);

export { BusinessModel, ProductModel };
