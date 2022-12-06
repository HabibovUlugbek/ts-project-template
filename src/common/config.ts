import dotenv from "dotenv";
import path from "path";
const cloudinary = require("cloudinary").v2;

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

export const ENV = {
  DB_URL:
    process.env.DB_URL ||
    "mongodb://localhost:27017" ||
    `mongodb://localhost:27001,localhost:27002,localhost:27003/Interview`,
  HOST: process.env.HOST || "0.0.0.0",
  ADMIN_PORT: parseInt(process.env.ADMIN_PORT) || 8000,
  USER_PORT: parseInt(process.env.USER_PORT) || 4000,
  TOKEN_KEY: "SECRET_KEY",
  TOKEN_TIME: { expiresIn: "3h" },
};

export const API = {
  admin_api: process.env.ADMIN_API || "admin",
  user_api: process.env.USER_API || "user",
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY,
});

export default cloudinary;
