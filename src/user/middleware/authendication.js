import { ApiError } from "../../utils/api_response.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let token;

  if (typeof authHeader === "string") {
    token = authHeader;
  }

  if (!token) {
    throw new ApiError(400, "Token Is Required");
  }
  jwt.verify(token, process.env.JWT_SECRETKEY, (err, decoded) => {
    if (err) {
      throw new ApiError(403, "Forbidden: Invalid or expired token.");
    }
    req.user = decoded;
    next();
  });
};

export default authentication;
