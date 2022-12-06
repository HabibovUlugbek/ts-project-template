import { Router } from "express";
import {
  createUserHandler,
  deleteUserHandler,
  getMyselfHandler,
  getUserHandler,
  loginUserHandler,
  updateUserHandler,
  userImageUploaderHandler,
} from "../../handlers/user/user.handler";

import { auth } from "../../middleware/auth";

const router = Router();

router.post("/register", createUserHandler);
router.post("/login", loginUserHandler);
router.post("/upload-image", auth, userImageUploaderHandler);
router.get("/me", auth, getMyselfHandler);
router.get("/:userId", auth, getUserHandler);
router.patch("/", auth, updateUserHandler);
router.delete("/", auth, deleteUserHandler);

export default router;
