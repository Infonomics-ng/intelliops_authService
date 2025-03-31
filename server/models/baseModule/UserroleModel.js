import { Sequelize } from 'sequelize';
import db from '../../config/Database.js';

const { DataTypes } = Sequelize;

const Userrole = db.define(
  'userrole',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usercd: {
      type: DataTypes.STRING,
      required: true,
    },
    sysrolecd: {
      type: DataTypes.STRING,
      required: true,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

export default Userrole;
