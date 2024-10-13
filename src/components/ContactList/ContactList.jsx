import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

const ContactList = ({ filteredContacts, onDeleteContact }) => {
  return (
    <div>
      <ul className={css.list}>
        {filteredContacts.map((contact) => (
          <Contact
            key={contact.id}
            id={contact.id}
            name={contact.name}
            number={contact.number}
            onDeleteContact={onDeleteContact}
          />
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
