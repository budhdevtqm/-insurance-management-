import {
  add,
  getAll,
  getSingle,
  updateName,
  companyDeletion,
} from "../models/companyModel.mjs";

const addCompany = async (req, res) => {
  try {
    const response = await add(req);
    res.status(201).json(response);
  } catch (error) {
    res.status(error.status).json(error);
  }
};

const updateCompany = async (req, res) => {
  try {
    const response = await updateName(req);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status).json(error);
  }
};

const getCompany = async (req, res) => {
  try {
    const response = await getSingle(req);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status).json(error);
  }
};

const getCompanies = async (req, res) => {
  try {
    const response = await getAll(req);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status).json(error);
  }
};

const deleteCompany = async (req, res) => {
  try {
    const response = await companyDeletion(req);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status).json(error);
  }
};

export { addCompany, updateCompany, getCompany, getCompanies, deleteCompany };
