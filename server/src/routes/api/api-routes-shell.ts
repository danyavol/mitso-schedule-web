import { adminOnly } from "@services/auth.service";
import { Router } from "express";
import auth from "./auth.routes";
import users from "./users.routes";

const apiRoutes = Router();
export default apiRoutes;


apiRoutes.use('/users', adminOnly, users);
apiRoutes.use('/auth', auth);