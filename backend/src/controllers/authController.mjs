import { loginUser, addADMIN, logoutUser } from "../models/authModel.mjs";

const login = async (req, res) => {
  try {
    const response = await loginUser(req);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status).json(error);
  }
};

const logout = async (req, res) => {
  try {
    const response = await logoutUser(req);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status).json(error);
  }
};

const addAdmin = async (req, res) => {
  try {
    const response = await addADMIN(req);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status).json(error);
  }
};

export { login, logout, addAdmin };
