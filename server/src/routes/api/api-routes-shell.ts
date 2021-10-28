import { Router } from "express";
import users from "./users.routes";

const apiRoutes = Router();
export default apiRoutes;


apiRoutes.use('/users', users);