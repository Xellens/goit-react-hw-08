import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { refreshUser } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import ContactsPage from "./pages/ContactsPage";
import NotFound from "./pages/NotFound";

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <b>Refreshing user...</b>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route
            path="/register"
            element={
              <PublicRoute restricted redirectTo="/contacts">
                <RegistrationPage />
              </PublicRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute restricted redirectTo="/contacts">
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login">
                <ContactsPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </>
  );
}
