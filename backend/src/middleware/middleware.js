const {handleError} = require("../controller/handleError");
const {users} = require("../model/multitenantdb-model");
const {getConnection} = require("../tcs/tenantDataBaseConnectionService");

module.exports.subDomainServices = async (request, response, next) => {
  if (request.subdomains.length === 1) {
    const subdomain = request.hostname.split(".")[0];
    try {
      const isValidDomain = await users.findOne({subdomain});
      if (!isValidDomain) {
        response.status(400).json({domain: "This domain is not registered"});
      } else {
        next();
      }
    } catch (error) {
      const Error = handleError(error);
      console.log(Error);
      next(error);
    }
  } else {
    next();
  }
};
