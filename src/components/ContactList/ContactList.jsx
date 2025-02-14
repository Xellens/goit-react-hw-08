import { useSelector } from "react-redux";
import { selectFilteredContacts } from "/src/redux/contacts/selectors";
import Contact from "/src/components/Contact/Contact";
import s from "./ContactList.module.css";

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={s.list}>
      {filteredContacts.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </ul>
  );
}
