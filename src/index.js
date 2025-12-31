import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connect from "./connection/connection.js";
import route from "./routes/index.js";
import staticRoute from "./routes/staticRoute.js";
import userRoute from "./routes/user.js";
import { MONGO_URL } from "./config/config.js";
import { checkAuth, restrictedTo } from "./middlewares/auth.js";

const app = express();

// ESM dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DB
connect(MONGO_URL);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkAuth);

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

// Routes
app.use("/", staticRoute);
app.use("/user", userRoute);
app.use("/url", restrictedTo(["Normal"]), route);

// Server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
