const mongoose = require("mongoose");

const databaseinstance = async (domain) => {
  const DBURL = process.env.DBURL + domain;
  const connection = await mongoose.createConnection(DBURL);
  connection.on("connected", () => {
    console.log(`Tenant (${domain}) DataBase is connected successfully `);
  });
  return connection
};

module.exports.getConnection = async (domain) => {
  try {
    //database access object
    const connection = await databaseinstance(domain);
    return connection
  } catch (error) {
    console.log("Tenant Database cann't connect " + error);
  }
};

module.exports.createTenantDataBase = async (domain) => {
    const tenantDataDase = await this.getConnection(domain)
    const todoCollection = await tenantDataDase.createCollection('todos')
    return todoCollection
};
