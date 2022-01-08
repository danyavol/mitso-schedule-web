import { adminOnly } from "@services/auth.service";
import { Router } from "express";
import auth from "./auth.routes";
import groups from "./groups.routes";
import schedule from "./schedule.routes";
import stats from "./stats.routes";
import users from "./users.routes";

const apiRoutes = Router();
export default apiRoutes;


apiRoutes.use('/users', adminOnly, users);
apiRoutes.use('/stats', adminOnly, stats);
apiRoutes.use('/groups', groups);
apiRoutes.use('/auth', auth);
apiRoutes.use('/schedule', schedule);