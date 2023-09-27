import { DataTypes } from "sequelize";
import db from "../store/db/db";

export const PriorityList = db.define(
  "priority_list",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    priority: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    freezeTableName: true,
  }
);

export const NotesRaw = db.define(
  "notes_raw",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    priorityId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

PriorityList.hasOne(NotesRaw, {
  foreignKey: {
    name: "priorityId",
    allowNull: false,
  },
});
NotesRaw.belongsTo(PriorityList, {
  foreignKey: {
    name: "priorityId",
    allowNull: false,
  },
});
