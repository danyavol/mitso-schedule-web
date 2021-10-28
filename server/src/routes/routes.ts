import { Router } from "express";
import apiRoutes from "./api/api-routes-shell";

const routes = Router();
export default routes;


routes.use('/api', apiRoutes);