import { createSelector } from "@reduxjs/toolkit";
import { selectFilter } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectIsError = (state) => state.contacts.isError;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filterValue) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
);
