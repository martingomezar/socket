import express from "express";
const app = express();
import * as http from "http";
import router from "../route/route";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
const myServer = new http.Server(app);

export { myServer };
