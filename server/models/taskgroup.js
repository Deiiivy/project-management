'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class TaskGroup extends Model {
    static associate(models) {
      TaskGroup.belongsTo(models.Group, { foreignKey: 'id_group', as: 'group' });
      TaskGroup.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' });
    }
  }

  TaskGroup.init(
    {
      id_group: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'TaskGroup',
      timestamps: true
    }
  );

  return TaskGroup;
};

