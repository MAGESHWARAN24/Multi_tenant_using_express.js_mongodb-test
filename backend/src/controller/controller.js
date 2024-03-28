const DAO = require("../model/utilities");
const DTO = require("../tcs/tenantDataBaseConnectionService");
const {handleError} = require("./handleError");

module.exports.__landingPage = (request, response) => {
  response.status(200).json({landingPage: "Dashboard"});
};

module.exports.__registerDomain = async (request, response) => {
  try {
    const {name, email, password, companyname} = request.body;
    const isRegister = await DAO.__registerDomain(
      name,
      email,
      password,
      companyname
    );
    if (isRegister) {
      const dataBase = await DTO.createTenantDataBase(
        isRegister.databaseinstance
      );
      response.status(200).json({Result: isRegister});
    } else {
      throw Error("Internal server error");
    }
  } catch (error) {
    const Error = handleError(error);
    response.status(400).json({Error: Error});
  }
};

module.exports.__getTodos_Get = async (request, response) => {
  try {
    const domain = request.subdomains[0];
    const todo = await DAO.__todo_with_subdomain(domain);
    response.status(200).json({Todo: todo});
  } catch (error) {
    const Error = handleError(error);
    response.status(400).json({Error: Error});
  }
};
module.exports.__addTodos_Post = async (request, response) => {
  try {
    const {task_name, task_description} = request.body;
    const domain = request.subdomains[0];
    const todo = await DAO.__addTodo_with_subdomain(
      task_name,
      task_description,
      domain
    );
    response.status(200).json({todo});
  } catch (error) {
    const Error = handleError(error);
    response.status(400).json({Error: Error});
  }
};

module.exports.__deleteTodos_Delete = async (request, response) => {
  try {
    const {task_id} = request.body;
    const domain = request.subdomains[0];
    const deleteTodo = await DAO.__deleteTodo_with_subdomain(task_id, domain);
    response.status(200).json({deleteTodo});
  } catch (error) {
    const Error = handleError(error);
    response.status(400).json({Error: Error});
  }
};

module.exports.__updateTodos_Patch = async (request, response) => {
  try {
    const {task_id, status} = request.body;
    const domain = request.subdomains[0];
    const updateTodo = await DAO.__updateTodo_with_subdomain(task_id, status, domain);
    response.status(200).json({updateTodo});
  } catch (error) {
    const Error = handleError(error);
    response.status(400).json({Error: Error});
  }
};
