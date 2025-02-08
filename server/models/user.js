import { DataTypes } from 'sequelize';
import  { sequelize } from '../database/dbConnection.js';
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING, 
    allowNull: false,
  }
});



export default User;

