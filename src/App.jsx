import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = window.localStorage.getItem("saved-contacts");
    if (savedContacts !== null) {
      return JSON.parse(savedContacts);
    }
    return [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ];
  });
  const [filter, setFilter] = useState("");
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim()) ||
      contact.number.toLowerCase().includes(filter.toLowerCase().trim())
  );
  const onChangeSearchBox = (event) => setFilter(event.target.value);
  useEffect(() => {
    window.localStorage.setItem("saved-contacts", JSON.stringify(contacts));
  }, [contacts]);
  const onAddContact = (formData) => {
    const newContact = {
      ...formData,
      id: nanoid(),
    };

    setContacts((prevState) => [...prevState, newContact]);
  };

  const onDeleteContact = (contactId) => {
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    setContacts(updatedContacts);
  };

  return (
    <div>
      <h1 className="titleApp">Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />
      <SearchBox value={filter} onChange={onChangeSearchBox} />
      <ContactList
        filteredContacts={filteredContacts}
        onDeleteContact={onDeleteContact}
      />
    </div>
  );
}

export default App;
