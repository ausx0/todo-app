import { RootState } from "../../store";

// Select all todos directly from the state
export const selectTodos = (state: RootState) => state.todos;

// Select completed todos
export const selectCompletedTodos = (state: RootState) =>
  state.todos.filter((todo) => todo.completed);

// Select incomplete todos
export const selectIncompleteTodos = (state: RootState) =>
  state.todos.filter((todo) => !todo.completed);

// Select todos by priority
export const selectTodosByPriority = (
  state: RootState,
  priority: "low" | "medium" | "high"
) => state.todos.filter((todo) => todo.priority === priority);

// Select todos by search term
export const selectTodosBySearch = (state: RootState, searchTerm: string) =>
  state.todos.filter((todo) =>
    todo.task.toLowerCase().includes(searchTerm.toLowerCase())
  );
