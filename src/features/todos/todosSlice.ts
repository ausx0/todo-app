// todosSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../interfaces";

// Initialize the state as an array of Todo objects
const initialState: Todo[] = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      // Push the new Todo object directly to the array
      state.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      // Filter the array to remove the Todo with the given id
      return state.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        // Toggle the completed state of the found Todo
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        // Update the Todo at the found index
        state[index] = action.payload;
      }
    },
  },
});

// Export actions
export const { addTodo, deleteTodo, toggleTodo, updateTodo } =
  todosSlice.actions;

// Export the reducer
export default todosSlice.reducer;
