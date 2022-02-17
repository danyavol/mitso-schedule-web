import { createAdminToken } from "@services/auth.service";
import { Crypto } from "@services/crypto.service";
import { Router } from "express";
const { SUPERADMIN_PASS } = process.env;

const auth = Router();
export default auth;


auth.post('/', async (req, res) => {
    const { password } = req.body;
    if (Crypto.compare(password, SUPERADMIN_PASS)) {
        createAdminToken(res);
        res.sendStatus(204);
    } else {
        res.sendStatus(401);
    }
});