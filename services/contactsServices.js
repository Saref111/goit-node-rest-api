import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const contactsPath = path.join('../', "db", "contacts.json");

export async function listContacts() {
  const list = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(list);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
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

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: contacts.length + 1, name, email, phone };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContact;
}
