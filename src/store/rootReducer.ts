// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import { persistReducer } from "redux-persist";
import persistConfig from "./persistConfig";

const rootReducer = combineReducers({
  todos: todosReducer, // The todos slice
});
// Wrap the rootReducer with persistReducer to enable persistence
export default persistReducer(persistConfig, rootReducer);
