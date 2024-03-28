module.exports.handleError = (error) => {
  const Error = {
    name: "",
    email: "",
    password: "",
    companyname: "",
    error:""
  };

  if (error.code === 11000) {
    Error["email"] = "This email already registered";
  }
  if(error.message === "Internal server error"){
    Error["error"] = "Internal server error"
  }
  if (error.message.includes("users validation failed")) {
    Object.values(error.errors).forEach(({properties}) => {
      Error[properties.path] = properties.message;
    });
  }
  return Error;
};
