import { Sequelize } from 'sequelize';
import db from '../../config/Database.js';
import Userrole from './UserroleModel.js';

const { DataTypes } = Sequelize;

const Users = db.define(
  'users',
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },

    password: {
      type: DataTypes.STRING,
    },
    identity: {
      type: DataTypes.STRING,
    },
    cashup_limit: {
      type: DataTypes.INTEGER,
    },
    active: {
      type: DataTypes.STRING,
    },
    first_time: {
      type: DataTypes.INTEGER,
    },
    valid_to: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

Userrole.belongsTo(Users, {
  foreignKey: 'usercd',
});

export default Users;
