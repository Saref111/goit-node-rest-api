import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
    const contacts = await contactsService.getAllContacts();
    return res.json(contacts);
};

export const getOneContact = async (req, res) => {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);
    if (!contact) {
        return res.json(HttpError(404));
    } else {
        return res.json(contact);
    }
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;
    const contact = await contactsService.removeContact(id);
    if (!contact) {
        return res.json(HttpError(404));
    } else {
        return res.json(contact);
    }
};

export const createContact = async (req, res) => {
    const { name, email, phone } = req.body;
    
    const newContact = await contactsService.addContact(name, email, phone);
    return res.json(newContact).status(201);
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
        return res.json(HttpError(400, "Body must have at least one field"));
    }

    const updatedContact = await contactsService.updateContact(id, name, email, phone);
    
    if (!updatedContact) {
        return res.json(HttpError(404));
    } else {
        return res.json(updatedContact);
    }
};
