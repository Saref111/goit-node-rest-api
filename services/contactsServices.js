import mongoose from "mongoose";

import { contactSchema } from "../schemas/contactsShemas.js";

const Contact = mongoose.model("Contact", contactSchema);

async function getAllContacts(userId, skip, limit, favorite) {
  const entityFields = { owner: userId };
  if (favorite !== undefined && favorite !== null) {
    entityFields.favorite = favorite;
  }
  return await Contact.find(entityFields).skip(skip).limit(limit);
}

async function getContactById(contactId, ownerId) {
  return await Contact.findOne({_id: contactId, owner: ownerId});
}

async function addContact({name, email, phone, favorite = false, owner}) {
  const newContact = new Contact({ name, email, phone, favorite, owner });
  await newContact.save();
  return newContact;
}

async function updateContact({contactId, name, email, phone, owner}) {
  const updatedContact = await Contact.findOneAndUpdate(
    {_id: contactId, owner: owner},
    { name, email, phone },
    { new: true }
  );
  return updatedContact;
}

async function removeContact(contactId, ownerId) {
  const removedContact = await Contact.findOneAndDelete({_id: contactId, owner: ownerId});
  return removedContact;
}

async function updateStatusContact(contactId, ownerId,  favorite) {
  const updatedContact = await Contact.findOneAndUpdate(
    {_id: contactId, owner: ownerId},
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
