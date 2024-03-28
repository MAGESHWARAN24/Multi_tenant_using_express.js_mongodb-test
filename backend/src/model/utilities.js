const {handleError} = require("../controller/handleError");
const DTO = require("../tcs/tenantDataBaseConnectionService");
const {users, todoSchema} = require("./multitenantdb-model");

const TODO = "todos";
module.exports.__registerDomain = async (
  name,
  email,
  password,
  companyname
) => {
  const user = await users.create({
    name,
    companyname,
    email,
    password,
    subdomain: companyname.toLowerCase(),
    databaseinstance: companyname.toLowerCase(),
  });
  return user;
};

module.exports.__todo_with_subdomain = async (domain) => {
  try {
    const connection_Obj = await DTO.getConnection(domain);
    const todoModel = await connection_Obj.model(TODO, todoSchema);
    const todos = await todoModel.find();
    return todos;
  } catch (error) {
    console.log(error);
    const Error = handleError(error);
    return Error;
  }
};
module.exports.__addTodo_with_subdomain = async (
  task_name,
  task_description,
  domain
) => {
  try {
    const connection_Obj = await DTO.getConnection(domain);
    const todoModel = await connection_Obj.model(TODO, todoSchema);
    const newTodo = await todoModel.create({task_name, task_description});
    return newTodo;
  } catch (error) {
    console.log(error);
    const Error = handleError(error);
    return Error;
  }
};

module.exports.__deleteTodo_with_subdomain = async (task_id, domain) => {
  try {
    const connection_Obj = await DTO.getConnection(domain);
    const todoModel = await connection_Obj.model(TODO, todoSchema);
    const deleteTodo = await todoModel.deleteOne({_id: task_id});
    return deleteTodo;
  } catch (error) {
    console.log(error);
    const Error = handleError(error);
    return Error;
  }
};

module.exports.__updateTodo_with_subdomain = async (
  task_id,
  status,
  domain
) => {
  try {
    const connection_Obj = await DTO.getConnection(domain);
    const todoModel = await connection_Obj.model(TODO, todoSchema);
    const updatedTodo = await todoModel.findOneAndUpdate(
      {_id: task_id},
      {task_status: status}
    );
    return updatedTodo;
  } catch (error) {
    console.log(error);
    const Error = handleError(error);
    return Error;
  }
};
