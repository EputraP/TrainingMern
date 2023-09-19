import { DataTypes } from "sequelize";
import db from "../store/db/db";

export const CountryList = db.define(
  "country_list",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING,
      unique: true,
    },
    value: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);
