import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operations";
import { selectAuthError } from "../../redux/auth/selectors";

import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from "./LoginForm.module.css";

const schema = Yup.object().shape({
  email: Yup.string().email("Некоректний email").required("Обов'язково"),
  password: Yup.string().min(6, "Мінімум 6 символів").required("Обов'язково"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(login(values)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Welcome back!");
        resetForm();
      }
    });
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Log In</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <label className={s.label} htmlFor="email">
            Email
          </label>
          <Field className={s.input} id="email" name="email" type="email" />
          <ErrorMessage name="email" component="div" className={s.formError} />

          <label className={s.label} htmlFor="password">
            Password
          </label>
          <Field
            className={s.input}
            id="password"
            name="password"
            type="password"
          />
          <ErrorMessage
            name="password"
            component="div"
            className={s.formError}
          />

          <button type="submit" className={s.btn}>
            Log In
          </button>
        </Form>
      </Formik>
    </div>
  );
}
