const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tasks extends Model {}

Tasks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    // time_created: {
    //   type: DataTypes.TIME,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },
    starting_time: {
      type: DataTypes.TIME,  
      allowNull: false,
    },
    ending_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tasks',
  }
);

module.exports = Tasks;
