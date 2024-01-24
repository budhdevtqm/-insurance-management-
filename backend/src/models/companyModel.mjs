import { validationResult } from "express-validator";
import pool from "../../utils/db.mjs";
import { modifiedErrors } from "../../utils/commonFns.mjs";

const add = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return reject({
          ok: false,
          status: 400,
          error: modifiedErrors(errors.array()),
        });
      }

      const { insurance_company_name } = req.body;

      const [sameCompanies] = await pool.query(
        "SELECT * FROM companies WHERE insurance_company_name = ?",
        [insurance_company_name]
      );

      if (sameCompanies.length > 0) {
        return reject({
          ok: false,
          status: 400,
          message: "This Company already exists!",
        });
      }

      await pool.query(
        "INSERT INTO companies (insurance_company_name,status) VALUES (?,?)",
        [insurance_company_name, 1]
      );

      resolve({ ok: true, status: 201, message: "Company added" });
    } catch (error) {
      reject({ ok: false, status: 500, message: "something went wrong" });
    }
  });
};

const updateName = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return reject({
          ok: false,
          status: 400,
          error: modifiedErrors(errors.array()),
        });
      }

      const companyId = req.params.id;
      const { insurance_company_name } = req.body;

      const [sameCompanies] = await pool.query(
        "SELECT * FROM companies WHERE insurance_company_name = ?",
        [insurance_company_name]
      );

      if (sameCompanies.length > 1) {
        return reject({
          ok: false,
          status: 400,
          message: "Pleae try with another name!",
        });
      }

      await pool.query(
        `UPDATE companies SET insurance_company_name = '${insurance_company_name}' WHERE id = ${companyId}`
      );

      resolve({ ok: true, status: 200, message: "Company updated" });
    } catch (error) {
      console.log("err", error);
      reject({ ok: false, status: 500, message: "something went wrong" });
    }
  });
};

const getSingle = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const companyId = req.params.id;
      const [companies] = await pool.query(
        "SELECT * FROM companies WHERE id=?",
        [companyId]
      );
      const company = companies[0];

      resolve({ ok: true, status: 200, data: company });
    } catch (error) {
      reject({ ok: false, status: 500, message: "something went wrong" });
    }
  });
};

const getAll = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [companies] = await pool.query("SELECT * FROM companies ");
      resolve({ ok: true, status: 200, data: companies });
    } catch (error) {
      reject({ ok: false, status: 500, message: "something went wrong" });
    }
  });
};

const companyDeletion = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const companyId = req.params.id;
      await pool.query("DELETE FROM companies WHERE id=?", [companyId]);
      resolve({ ok: true, status: 200, message: "Company Deleted" });
    } catch (error) {
      console.log(error);
      reject({ ok: false, status: 500, message: "something went wrong" });
    }
  });
};

export { add, updateName, getSingle, getAll, companyDeletion };
