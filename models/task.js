'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: 'user_id', // This should match the column name in NoteTable
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Task.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'UserTable',
        key: 'uuid',
      },
    },
    title: {
      type: DataTypes.STRING,
    },
    isChecked: {
      type: DataTypes.BOOLEAN,
    },
    isPersonal: {
      type: DataTypes.BOOLEAN,
    },
    description:{
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'TaskTable',
    timestamps: true,
    // updatedAt: 'updated_at',
  });

  return Task;
};
