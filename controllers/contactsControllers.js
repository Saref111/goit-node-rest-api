import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const { user } = req;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await contactsService.getAllContacts(user.id, skip, +limit);
  return res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { _id: ownerId } = req.user;

  const contact = await contactsService.getContactById(id, ownerId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  } else {
    return res.json(contact);
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { _id: ownerId } = req.user;
  const contact = await contactsService.removeContact(id, ownerId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  } else {
    return res.json(contact);
  }
};

export const createContact = async (req, res) => {
  const { name, email, phone, favorite } = req.body;

  const newContact = await contactsService.addContact({
    name,
    email,
    phone,
    favorite,
    owner: req.user._id,
  });
  return res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const { _id: ownerId } = req.user;

  if (!name && !email && !phone) {
    return res
      .status(400)
      .json({ message: "Body must have at least one field" });
  }

  const updatedContact = await contactsService.updateContact({
    id,
    name,
    email,
    phone,
    owner: ownerId,
  });

  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  } else {
    return res.json(updatedContact);
  }
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const { _id: ownerId } = req.user;

  const updatedContact = await contactsService.updateStatusContact(
    id,
    ownerId,
    favorite
  );

  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(updatedContact);
};
