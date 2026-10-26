import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../feature/todo/todoSlice.js";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
