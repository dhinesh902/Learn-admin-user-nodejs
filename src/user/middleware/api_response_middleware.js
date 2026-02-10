import { json } from "sequelize";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    status: err.status || "failed",
    message: err.message || "Internal Server Error",
  });
};

export const successResponse = (res, apiResponse) => {
  return res.status(apiResponse.statusCode).json({
    status: apiResponse.status,
    data: apiResponse.data,
  });
};
