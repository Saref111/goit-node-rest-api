import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const contactsPath = path.join("db", "contacts.json");

async function getAllContacts() {
  const list = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(list);
}

async function getContactById(contactId) {
  const contacts = await getAllContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await getAllContacts();
  const removedContact = contacts.find(
    ({ id }) => id.toString() === contactId.toString()
  );
  if (!removedContact) return null;

  const newContacts = contacts.filter(
    ({ id }) => id.toString() !== contactId.toString()
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await getAllContacts();
  const newContact = { id: contacts.length + 1, name, email, phone };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContact;
}

async function updateContact(contactId, name, email, phone) {
  const contacts = await getAllContacts();
  const contactToUpdate = contacts.find(
    ({ id }) => id.toString() === contactId.toString()
  );
  if (!contactToUpdate) return null;

  const updatedContact = { ...contactToUpdate, name, email, phone };
  const newContacts = contacts.map((contact) =>
    contact.id.toString() === contactId.toString() ? updatedContact : contact
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return updatedContact;
}

export default { getAllContacts, getContactById, removeContact, addContact, updateContact };
