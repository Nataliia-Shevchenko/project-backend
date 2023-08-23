import express from "express";
import {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateStatusContact,
} from "../../controllers/contacts/index.js";
import { validateBody } from "../../decorators/index.js";
import contactsSchemas from "../../schemas/contacts-schemas.js";
import { isEmptyBody, isValidId, authenticate } from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", getAll);

contactsRouter.get("/:id", isValidId, getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactsSchemas.contactAddSchema),
  add
);

contactsRouter.delete("/:id", isValidId, deleteById);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactsSchemas.contactAddSchema),
  updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactsSchemas.contactUpdateFavoriteSchema),
  updateStatusContact
);

export default contactsRouter;
