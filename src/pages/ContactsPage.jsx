import ContactForm from "/src/components/ContactForm/ContactForm";
import SearchBox from "/src/components/SearchBox/SearchBox";
import ContactList from "/src/components/ContactList/ContactList";

export default function ContactsPage() {
  return (
    <div>
      <h2>Your Contacts</h2>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}
