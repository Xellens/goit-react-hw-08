import { useDispatch } from "react-redux";
import { deleteContact } from "/src/redux/contacts/operations";
import s from "./Contact.module.css";

export default function Contact({ contact }) {
  const dispatch = useDispatch();
  const { id, name, number } = contact;

  const handleDelete = () => dispatch(deleteContact(id));

  return (
    <li className={s.item}>
      <span>
        {name}: {number}
      </span>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}
