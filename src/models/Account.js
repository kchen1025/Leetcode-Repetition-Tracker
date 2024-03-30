import { DataTypes, Model } from "sequelize";

export default (sequelize, Sequelize) => {
  class Account extends Model {}

  Account.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      google_id: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
      },
      last_login: {
        type: DataTypes.DATE,
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "Account", // We need to choose the model name
      tableName: "account", // need to tell sequelize table name or it will automatically pluralize the model name and pull from there (select * from Accounts)
      createdAt: "added", // rename the default timestamp 'createdAt' to be 'added'
      updatedAt: "updated", // rename default 'updatedAt' to 'updated'
    }
  );

  return Account;
};
