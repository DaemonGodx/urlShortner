import express from "express";
import { createShortId, redirect, analytics,getAll } from "../controllers/urlController.js";

const route = express.Router();

route.post("/", createShortId);
route.get("/:shortId", redirect);
route.get("/analytics/:shortId", analytics);
route.get("/",getAll)


export default route;
