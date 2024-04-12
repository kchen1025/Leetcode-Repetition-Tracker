import { db } from "../models/index.js";

const Account = () => {
  const AccountModel = db.account;

  // declare custom classes within
  AccountModel.method = async () => {
    const test = AccountModel.findAll();
    return test;
  };

  // return the instance
  return AccountModel;
};

export default Account;
