import { createAdminToken } from "@services/auth.service";
import { Router } from "express";
const { SUPERADMIN_PASS } = process.env;

const auth = Router();
export default auth;


auth.post('/', async (req, res) => {
    const { password } = req.body;
    if (password === SUPERADMIN_PASS) {
        createAdminToken(res);
        res.sendStatus(204);
    } else {
        res.sendStatus(401);
    }
});