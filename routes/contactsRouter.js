import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import validateId from "../helpers/validateId.js";
import {
  createContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
} from "../schemas/contactsValidationSchemas.js";
import { authenticateToken } from "../helpers/authenticateToken.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticateToken, getAllContacts);

contactsRouter.get("/:id", authenticateToken, validateId, getOneContact);

contactsRouter.delete("/:id", authenticateToken, validateId, deleteContact);

contactsRouter.post(
  "/",
  authenticateToken,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  authenticateToken,
  validateId,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  authenticateToken,
  validateId,
  validateBody(updateContactStatusSchema),
  updateStatusContact
);

export default contactsRouter;
