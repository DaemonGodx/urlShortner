import express from "express";
import { createShortId, redirect, analytics,getAll } from "../controllers/urlController.js";
import Url from "../models/url.js";


const route = express.Router();

route.post("/", createShortId);

route.post("/delete/:shortId",  async (req, res) => {
    const { shortId } = req.params;

    try {
       await Url.deleteOne({
            shortId: shortId,
            createdBy: req.user._id
        });
        res.redirect("/");
    } catch (err) {
        console.error("Error deleting URL:", err);
        res.status(500).send("Error deleting URL");
    }
});


route.get("/:shortId", redirect);
route.get("/analytics/:shortId", analytics);
route.get("/",getAll)


export default route;
