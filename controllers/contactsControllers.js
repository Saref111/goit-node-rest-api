import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
    const { user } = req;
    const contacts = await contactsService.getAllContacts(user.id);
    return res.json(contacts);
};

export const getOneContact = async (req, res) => {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);
    if (!contact) {
        return res.status(404).json({message: "Not found"});
    } else {
        return res.json(contact);
    }
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;
    const contact = await contactsService.removeContact(id);
    if (!contact) {
        return res.status(404).json({message: "Not found"});
    } else {
        return res.json(contact);
    }
};

export const createContact = async (req, res) => {
    const { name, email, phone, favorite } = req.body;
    
    const newContact = await contactsService.addContact(name, email, phone, favorite, req.user.id);
    return res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
        return res.status(400).json({message: "Body must have at least one field"});
    }

    const updatedContact = await contactsService.updateContact(id, name, email, phone);
    
    if (!updatedContact) {
        return res.status(404).json({message: "Not found"});
    } else {
        return res.json(updatedContact);
    }
};

export const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;
  
    const updatedContact = await contactsService.updateStatusContact(id, { favorite });
  
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
  
    res.json(updatedContact);
  }
