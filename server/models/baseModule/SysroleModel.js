import { Sequelize } from 'sequelize';
import db from '../../config/Database.js';

const { DataTypes } = Sequelize;

const Sysrole = db.define(
  'sysrole',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sysrolecd: {
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
    // grpmenu: {
    //   type: DataTypes.STRING,
    //   required: true,
    // },
    view: {
      type: DataTypes.BOOLEAN,
      required: true,
    },
    crud: {
      type: DataTypes.BOOLEAN,
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

Sysrole.hasMany(Sysrole, {
  foreignKey: 'sysrolecd',
  as: 'associatedPrivileges',
});

export default Sysrole;
