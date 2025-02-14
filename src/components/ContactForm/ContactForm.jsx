import { useDispatch, useSelector } from "react-redux";
import { addContact } from "/src/redux/contacts/operations";
import { selectContacts } from "/src/redux/contacts/selectors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from "./ContactForm.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required.").min(3, "Min 3 characters."),
  number: Yup.string()
    .required("Phone number is required.")
    .min(3, "Min 3 characters."),
});

const initialValues = { name: "", number: "" };

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, { resetForm }) => {
    const isExist = contacts.some(
      (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
    );
    if (isExist) {
      alert(`Contact with name "${values.name}" already exists!`);
      return;
    }
    dispatch(addContact(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={s.form}>
        <label>Name</label>
        <Field name="name" type="text" />
        <ErrorMessage name="name" component="div" className={s.error} />

        <label>Number</label>
        <Field name="number" type="text" />
        <ErrorMessage name="number" component="div" className={s.error} />

        <button type="submit">Add Contact</button>
      </Form>
    </Formik>
  );
}
