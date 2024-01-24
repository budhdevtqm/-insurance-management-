import jwt from "jsonwebtoken";
import pool from "../../utils/db.mjs";
import { hash, compare } from "bcrypt";
import { validationResult } from "express-validator";
import { modifiedErrors } from "../../utils/commonFns.mjs";

const loginUser = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        reject({
          ok: false,
          status: 400,
          error: modifiedErrors(errors.array()),
        });
      }

      const { email, password } = req.body;

      const [users] = await pool.query(
        "SELECT * FROM users WHERE email = ? LIMIT 1",
        [email]
      );

      if (users.length === 0) {
        reject({
          ok: false,
          status: 400,
          error: { message: "User not found!" },
        });
      }

      const { role, password: hashed } = users[0];
      const validPassword = await compare(password, hashed);

      if (!validPassword) {
        reject({
          ok: false,
          status: 400,
          error: { message: "Invalid password!" },
        });
      }

      const token = jwt.sign(
        { userRole: role, userEmail: email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );

      resolve({
        role,
        token,
        ok: true,
        status: 200,
        message: "login successfully.",
      });
    } catch (error) {
      reject({ ok: false, message: "Something went wrong", status: 500 });
    }
  });
};

const logoutUser = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = req.headers["authorization"];

      if (!token) {
        reject({ status: 401, message: "Unauthorized" });
      }

      const { userRole, userEmail } = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );
      console.log({ userRole, userEmail });
    } catch (error) {
      console.log("error", error);
      reject({ status: 401, message: "Unauthorized" });
    }
  });
};

const addADMIN = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, email, password } = req.body;
      const hashed = await hash(password, 10);

      // const [users] = await pool.query("SELECT * FROM users");
      const addAdmin = await pool.query(
        "INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)",
        [name, email, hashed, "admin", 1]
      );

      console.log("addAdmin", addAdmin);

      // console.log("users", users);

      // console.log("hashed", hashed);
    } catch (error) {
      console.log("error", error);
    }
  });
};

export { loginUser, logoutUser, addADMIN };
