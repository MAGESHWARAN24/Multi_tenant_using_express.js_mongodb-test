const mongoose = require("mongoose");
const {isEmail, isStrongPassword} = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {type: String, required: [true, "Name  is mandatory"]},
  email: {
    type: String,
    required: [true, "Email  is mandatory"],
    validate: [isEmail, "Enter the valid email"],
    unique: [true, "This email is already registered"],
  },
  password: {
    type: String,
    required: [true, "Password  is mandatory"],
    validate: [isStrongPassword, "Enter the valid email"],
  },
  databaseinstance: {type: String},
  subdomain: {type: String},
  companyname: {
    type: String,
    required: [true, "Companyname  is mandatory"],
    unique: [true, "This company is already registered"],
  },
});

const todoSchema = mongoose.Schema({
  task_name: {
    type: String,
    required: [true, "Name  is mandatory"],
  },
  task_description: {
    type: String,
    required: [true, "description is mandatory"],
  },
  task_status:{
    type:String,
    default:"pending"
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  const hashpassword = await bcrypt.hash(this.password, salt);
  this.password = hashpassword;
  next();
});

const users = mongoose.model("users", userSchema);

module.exports = {users, todoSchema};
