'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'uuid',
      }
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    title: DataTypes.STRING,
    isChecked: DataTypes.BOOLEAN,
    isPersonal: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    created_at: DataTypes.DATE
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.User, { foreignKey: 'user_id' });
  };
  return Task;
};
