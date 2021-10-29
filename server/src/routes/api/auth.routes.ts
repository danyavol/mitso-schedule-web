import { createAdminToken } from "@services/auth.service";
import { Router } from "express";

const auth = Router();
export default auth;


auth.get('/', async (req, res) => {
    createAdminToken(res);
    res.sendStatus(200);
});