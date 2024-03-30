import { db } from "../models/index.js";

const Account = () => {
  const AccountModel = db.account;

  // declare custom classes within
  AccountModel.yeet = async () => {
    const whatever = AccountModel.findAll();
    return whatever;
  };

  // return the instance
  return AccountModel;
};

export default Account;
