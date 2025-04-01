'use strict';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConnection.js';

class TaskGroup extends Model {
  static associate(models) {
    TaskGroup.belongsTo(models.Group, { foreignKey: 'id_group', as: 'groups' });
    TaskGroup.belongsTo(models.User, { foreignKey: 'id_user', as: 'users' });
  }
}

TaskGroup.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_group: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'TaskGroup',
    tableName: 'taskgroups', 
    timestamps: true,
  }
);

export default TaskGroup;
