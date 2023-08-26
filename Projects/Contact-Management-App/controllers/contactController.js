// @GET /api/contacts
// @desc Returns all the contacts
/** @type {import("mongoose").Model} */
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");



const getContacts = asyncHandler(async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

});

// @GET /api/contacts/:id
// @desc Returns a single contacts
const getContact = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      res.status(404)
      throw new Error("Contact not foun");
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});

// @POST /api/contacts
// @desc Creates a new contacts
const createContact = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { name, phone, email } = req.body;
  if (!name || !phone || !email) {
    res.status(400)
    throw new Error("All fields are required");
  }
  const contact = await Contact.create(req.body)
  res.status(200).json(contact);
});

// @PUT /api/contacts/:id
// @desc Updates a contact
const updateContact = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true })
    if (!contact) {
      res.status(404)
      throw new Error("Contact Not Found")
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @DELETE /api/contacts/:id
// @desc Deletes a contact
const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndDelete(id)
  if (!contact) {
    res.status(404)
    throw new Error("Contact Not Found")
  }
  res.status(200).json({ message: `Delete contact for ${req.params.id}`, Deletedcontact: contact });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
