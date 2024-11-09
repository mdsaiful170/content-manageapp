import React, { useState } from 'react';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '', email: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name'); // To toggle between 'name' and 'email'

  const addContact = () => {
    setContacts([
      ...contacts,
      { id: Date.now(), ...newContact },
    ]);
    setNewContact({ name: '', phone: '', email: '' });
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const editContact = (id) => {
    const contactToEdit = contacts.find(contact => contact.id === id);
    setNewContact(contactToEdit);
    deleteContact(id);
  };

  // Filter contacts based on the search term and selected search type (name or email)
  const filteredContacts = contacts.filter(contact => {
    if (searchBy === 'name') {
      return contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchBy === 'email') {
      return contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  return (
    <div className="App">
      <h1 className="title">Contact Management App</h1>

      {/* Search options (Name or Email) */}
      <div className="search-options">
        <select onChange={(e) => setSearchBy(e.target.value)} value={searchBy}>
          <option value="name">Search by Name</option>
          <option value="email">Search by Email</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchBy}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Form to add/edit contacts */}
      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <button onClick={addContact}>Add Contact</button>
      </div>

      {/* Contact list */}
      <ul className="contact-list">
        {filteredContacts.map((contact) => (
          <li key={contact.id} className="contact-item">
            <div className="contact-info">
              <strong>{contact.name}</strong>
              <p>{contact.phone}</p>
              <p>{contact.email}</p>
            </div>
            <div className="actions">
              <button className="edit-btn" onClick={() => editContact(contact.id)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteContact(contact.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
