import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = process.env.port || 7777;

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

app.listen(port, console.log("Server is listening at port ", port));
