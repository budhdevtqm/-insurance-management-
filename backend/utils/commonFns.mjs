const modifiedErrors = (errorsArray) => {
  const errorsObject = {};
  errorsArray.forEach((error) => {
    errorsObject[error.path] = error.msg;
  });
  return errorsObject;
};

export { modifiedErrors };
