const User = require('./User');
const Tasks = require('./Tasks');

User.hasMany(Tasks, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Tasks.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Tasks };
