import express from "express";
import authAdmin from "../middlewares/authAdmin.mjs";
import { companyValidation } from "../../utils/validations.mjs";
import {
  addCompany,
  getCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.mjs";

const router = express.Router();

router.get("/get/:id", [authAdmin], getCompany);
router.get("get-all", [authAdmin], getCompanies);
router.delete("/delete/:id", [authAdmin], deleteCompany);
router.post("/add", [authAdmin, companyValidation], addCompany);
router.patch("/update/:id", [authAdmin, companyValidation], updateCompany);

export default router;
