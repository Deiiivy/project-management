import { DataTypes } from 'sequelize' 
import {sequelize} from '../database/dbConnection.js'
import User from './user.js';


const Task = sequelize.define(
  'Task', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
      userId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, 
      key: 'id',   
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    },
    })
export default Task;
