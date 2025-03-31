import { Sequelize } from 'sequelize';
import db from '../../config/Database.js';

const { DataTypes } = Sequelize;

const Sysprivilege = db.define(
  'sysprivilege',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    grpmenu: {
      type: DataTypes.STRING,
      required: true,
    },
    sysprivilegecd: {
      type: DataTypes.STRING,
      required: true,
    },
    sysprivilegename: {
      type: DataTypes.STRING,
      required: true,
    },
    createdBy: { type: DataTypes.STRING, allowNull: false },
    lastupdatedBy: { type: DataTypes.STRING, allowNull: false },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

export default Sysprivilege;
