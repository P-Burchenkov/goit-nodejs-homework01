const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const contactJson = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(contactJson);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const [contactById] = contacts.filter((contact) => contact.id === contactId);
  return contactById || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const removedContactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (removedContactIndex === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(removedContactIndex, 1);
  writeContacts(contacts);
  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  writeContacts(contacts);
  return newContact;
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
