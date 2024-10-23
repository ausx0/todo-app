import storage from "redux-persist/lib/storage";

// Persist config for redux-persist
const persistConfig = {
  key: "root",
  storage,
};

export default persistConfig;
