import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { contactsReducer } from "./contacts/slice";
import { filtersReducer } from "./filters/slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const rootReducer = {
  auth: persistReducer(authPersistConfig, authReducer),
  contacts: contactsReducer,
  filters: filtersReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
