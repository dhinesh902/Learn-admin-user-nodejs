import { ApiError, ApiSuccess } from "../../utils/api_response.js";
import { successResponse } from "../middleware/api_response_middleware.js";
import { UserModel } from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodeMailer from "nodemailer";

dotenv.config();

export const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!confirmPassword) missingFields.push("confirmPassword");

    if (missingFields.length > 0) {
      throw new ApiError(400, `${missingFields.join(", ")} field required`);
    }

    if (password !== confirmPassword) {
      throw new ApiError(400, "Password and confirm password do not match");
    }

    const existingUser = await UserModel.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return successResponse(
      res,
      new ApiSuccess(201, "User registered successfully"),
    );
  } catch (error) {
    next(error);
  }
};

/// Login

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const user = await UserModel.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ApiError(400, "User not found");
    }

    const validPassWord = await bcrypt.compare(password, user.password);

    if (!validPassWord) {
      throw new ApiError(400, "Invalid Password");
    }

    const token = jwt.sign(
      {
        userid: user.userid,
        role: user.role,
      },
      process.env.JWT_SECRETKEY,
      { expiresIn: "1d" },
    );

    return successResponse(
      res,
      new ApiSuccess(200, {
        message: "Login Successflly",
        token: token,
      }),
    );
  } catch (error) {
    next(error);
  }
};
