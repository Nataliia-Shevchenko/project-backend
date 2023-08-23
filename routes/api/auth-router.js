import express from "express";
import usersSchemas from "../../schemas/users-schemas.js";
import { validateBody } from "../../decorators/index.js";
import {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verify,
  resendVerifyEmail,
} from "../../controllers/users/index.js";
import { authenticate, upload, resizeImage } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(usersSchemas.userSignupSchema),
  register
);

authRouter.get("/verify/:verificationToken", verify);

authRouter.post(
  "/verify",
  validateBody(usersSchemas.userEmailSchema),
  resendVerifyEmail
);

authRouter.post("/login", validateBody(usersSchemas.userSigninSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

authRouter.patch(
  "/",
  authenticate,
  validateBody(usersSchemas.userUpdateSubscriptionSchema),
  updateSubscription
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  resizeImage,
  updateAvatar
);

export default authRouter;
