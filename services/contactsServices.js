import mongoose from "mongoose";

import { contactSchema } from "../schemas/contactsShemas.js";

const Contact = mongoose.model("Contact", contactSchema);

async function getAllContacts() {
  return await Contact.find();
}

async function getContactById(contactId) {
  return await Contact.findById(contactId);
}

async function addContact(name, email, phone, favorite = false) {
  const newContact = new Contact({ name, email, phone, favorite });
  await newContact.save();
  return newContact;
}

async function updateContact(contactId, name, email, phone) {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { name, email, phone },
    { new: true }
  );
  return updatedContact;
}

async function removeContact(contactId) {
  const removedContact = await Contact.findByIdAndDelete(contactId);
  return removedContact;
}

async function updateStatusContact(contactId, { favorite }) {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite: Boolean(favorite) },
    { new: true }
  );
  return updatedContact;
}

export default {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
