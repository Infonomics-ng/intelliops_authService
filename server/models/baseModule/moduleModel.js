import { Sequelize } from 'sequelize';
import db from '../../config/Database.js';

const { DataTypes } = Sequelize;

const UserModule = db.define(
  'usermodule',
  {
    usercd: { type: DataTypes.STRING, allowNull: false },
    module_name: { type: DataTypes.STRING, allowNull: false },
    modulecd: { type: DataTypes.STRING, allowNull: false },
    timestamp: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
    createdAt: { type: DataTypes.DATE, allowNull: true },  // Allow NULL values
    updatedAt: { type: DataTypes.DATE, allowNull: true },  // Allow NULL values
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

(async () => {
  await db.sync();
})();

export default UserModule;
