import { createAdminToken } from "@services/auth.service";
import { Router } from "express";
const { SUPERADMIN_PASS } = process.env;

const auth = Router();
export default auth;


auth.get('/', async (req, res) => {
    const { password } = req.body;
    if (password === SUPERADMIN_PASS) {
        createAdminToken(res);
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});