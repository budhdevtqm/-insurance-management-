import express from "express";
import "dotenv/config";

const app = express();

console.log(process.env.PORT);

app.listen(process.env.PORT || 4000, () => console.log("server started"));
