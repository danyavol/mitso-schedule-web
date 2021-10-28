import { db } from "@database/database";
import { Router } from "express";

const users = Router();
export default users;


users.get('/', async (req, res) => {
    const allUsers = await db.UserRepository().find();
    res.json(allUsers);
});