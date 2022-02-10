import { adminOnly } from "@services/auth.service";
import { Router } from "express";
import auth from "./auth.routes";
import classroom from "./classroom.routes";
import groups from "./groups.routes";
import schedule from "./schedule.routes";
import stats from "./stats.routes";
import teachers from "./teachers.routes";
import users from "./users.routes";

const apiRoutes = Router();
export default apiRoutes;


apiRoutes.use('/users', adminOnly, users);
apiRoutes.use('/stats', adminOnly, stats);
apiRoutes.use('/groups', groups);
apiRoutes.use('/auth', auth);
apiRoutes.use('/schedule', schedule);
apiRoutes.use('/teachers', teachers);
apiRoutes.use('/classroom', classroom);