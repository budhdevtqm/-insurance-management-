import { check } from "express-validator";

const loginValidation = [
  check("email").isEmail().withMessage("Invalid email address"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const companyValidation = [
  check("insurance_company_name")
    .isLength({ min: 3 })
    .withMessage("Length must be of 3 chars!"),
];

export { loginValidation, companyValidation };
