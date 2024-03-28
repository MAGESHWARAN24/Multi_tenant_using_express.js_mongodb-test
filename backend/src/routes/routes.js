const {Router} = require("express");
const routeContoller = require("../controller/controller");
const {subDomainServices} = require("../middleware/middleware");

const routes = Router();

routes.get("/", subDomainServices, routeContoller.__landingPage);
routes.post("/register",routeContoller.__registerDomain)
routes.get("/todo",subDomainServices,routeContoller.__getTodos_Get)
routes.post("/addtodo",subDomainServices,routeContoller.__addTodos_Post)
routes.delete("/deletetodo",subDomainServices,routeContoller.__deleteTodos_Delete)
routes.patch("/updatetodo",subDomainServices,routeContoller.__updateTodos_Patch)
module.exports = routes;
