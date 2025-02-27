import { DataTypes } from "sequelize";
import { sequelize } from '../database/dbConnection.js';

const Group = sequelize.define(
  'Group',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_creator: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_guess: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    timestamps: true,
  }
);

export default Group;

