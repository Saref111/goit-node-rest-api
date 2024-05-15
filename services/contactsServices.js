import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.DB_HOST;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

async function getAllContacts() {
  return await Contact.find();
}

async function getContactById(contactId) {
  return await Contact.findById(contactId);
}

async function addContact(name, email, phone) {
  const newContact = new Contact({ name, email, phone });
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
  const result = await Contact.findByIdAndRemove(contactId);
  return { message: "Contact removed", result };
}

async function updateStatusContact(contactId, body) {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite: body.favorite },
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
