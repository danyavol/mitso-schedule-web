import { db } from "@database/database";
import { paginateData } from "@services/pagination.service";
import { sortData, SortDirection } from "@services/sort.service";
import { Router } from "express";

const users = Router();
export default users;


users.get('/', async (req, res) => {
    const { page, itemsPerPage, sortField, sortDirection } = req.query;
    const allUsers = await db.UserRepository().find();
    sortData(allUsers, sortField as string, sortDirection as SortDirection);
    res.json( paginateData(allUsers, page, itemsPerPage) );
});