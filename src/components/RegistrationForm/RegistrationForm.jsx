import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/operations";
import { selectAuthError } from "../../redux/auth/selectors";
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import s from "./RegistrationForm.module.css";

const schema = Yup.object().shape({
  name: Yup.string().min(2, "Мінімум 2 символи").required("Обов'язково"),
  email: Yup.string().email("Некоректний email").required("Обов'язково"),
  password: Yup.string().min(6, "Мінімум 6 символів").required("Обов'язково"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Welcome! Реєстрація успішна!");
        resetForm();
      }
    });
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Registration</h2>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <label className={s.label} htmlFor="name">
            Name
          </label>
          <Field
            className={s.input}
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
          />
          <ErrorMessage name="name" component="div" className={s.formError} />

          <label className={s.label} htmlFor="email">
            Email
          </label>
          <Field
            className={s.input}
            id="email"
            name="email"
            type="email"
            placeholder="youremail@example.com"
          />
          <ErrorMessage name="email" component="div" className={s.formError} />

          <label className={s.label} htmlFor="password">
            Password
          </label>
          <Field
            className={s.input}
            id="password"
            name="password"
            type="password"
            placeholder="******"
          />
          <ErrorMessage
            name="password"
            component="div"
            className={s.formError}
          />

          <button type="submit" className={s.btn}>
            Sign Up
          </button>
        </Form>
      </Formik>
    </div>
  );
}
