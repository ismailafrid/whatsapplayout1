import React, { useState } from "react";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [editingContactIndex, setEditingContactIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // form validation
    if (name.length < 5) {
      alert("Name must be at least 5 characters long.");
      return;
    }

    if (!/^\d+$/.test(phoneNumber)) {
      alert("Phone number must only contain numbers.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const newContact = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
    };

    if (editingContactIndex !== null) {
      const updatedContacts = [...contacts];
      updatedContacts[editingContactIndex] = newContact;
      setContacts(updatedContacts);
      setEditingContactIndex(null);
    } else {
      setContacts([...contacts, newContact]);
    }

    setName("");
    setEmail("");
    setPhoneNumber("");
  };

  const handleUpdate = (index) => {
    const contact = contacts[index];
    setName(contact.name);
    setEmail(contact.email);
    setPhoneNumber(contact.phoneNumber);
    setEditingContactIndex(index);
  };

  const handleDelete = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };

  return (
    <>
      <div className="navbar"></div>
      <div className="App">
        <div className="left-side">
          <h1>Chats</h1>
          <ul>
            {contacts.map((contact, index) => (
              <li key={index}>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
                <p>{contact.phoneNumber}</p>
                <button onClick={() => handleUpdate(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="right-side">
          <div className="form-container">
            <h1>
              {editingContactIndex !== null
                ? "Edit Contact"
                : "Create New Contact"}
            </h1>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  value={name}
                  min={5}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  placeHolder="xxxxxx@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  maxLength={10}
                  minLength={10}
                  required
                />
              </label>
              <button type="submit">
                {editingContactIndex !== null ? "Save Changes" : "Add Contact"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
