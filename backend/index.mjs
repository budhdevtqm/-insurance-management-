import express from "express";
import cors from "cors";
import "dotenv/config";

// import userRouter from "./src/routes/usersRoute";
import authRouter from "./src/routes/authRoute.mjs";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
// app.use("/user", userRouter);

app.listen(process.env.PORT || 4000, () => console.log("server started"));
