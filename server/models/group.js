import { DataTypes } from "sequelize";
import { sequelize } from '../database/dbConnection.js'


const group = sequelize.define(
'group',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    }
  }
)
