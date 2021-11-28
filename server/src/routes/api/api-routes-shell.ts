import { adminOnly } from "@services/auth.service";
import { Router } from "express";
import auth from "./auth.routes";
import groups from "./groups.routes";
import stats from "./stats.routes";
import users from "./users.routes";

const apiRoutes = Router();
export default apiRoutes;


apiRoutes.use('/users', adminOnly, users);
apiRoutes.use('/groups', groups);
apiRoutes.use('/stats', stats);
apiRoutes.use('/auth', auth);