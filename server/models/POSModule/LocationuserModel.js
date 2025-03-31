import { Sequelize } from 'sequelize';
import db from '../../config/Database.js';

const { DataTypes } = Sequelize;

const LocationUser = db.define(
  'locationuser',
  {
    usercd: { type: DataTypes.STRING, allowNull: false },
    employee_no: { type: DataTypes.STRING(32 ), allowNull: true },
    poscd: { type: DataTypes.STRING, allowNull: false },
    posname: { type: DataTypes.STRING, allowNull: false },
    shopcd: { type: DataTypes.STRING, allowNull: true },
    shopname: { type: DataTypes.STRING, allowNull: true },
    locationcd: { type: DataTypes.STRING, allowNull: false },
    locationname: { type: DataTypes.STRING, allowNull: false },
    pryordertypecd: { type: DataTypes.STRING, allowNull: false },
    prylocation_flag:{type:DataTypes.INTEGER, allowNull: false},
    prytranstypecd:{type: DataTypes.STRING, allowNull: false},
    usergroupcd:{type: DataTypes.STRING, allowNull: false},
    cashuplimit: { type: DataTypes.DECIMAL(20, 6), allowNull: false },
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

export default LocationUser;
