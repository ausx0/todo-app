export interface Todo {
  id: string;
  task: string;
  completed: boolean;
  priority: "low" | "medium" | "high"; // Priority level of the todo
  description?: string; // Optional detailed description of the task
  tags?: string[]; // Optional tags to categorize tasks
  createdAt: Date | string; // Timestamp of when the todo was created
}

export interface TodosState {
  todos: Todo[]; // The state is an array of Todo objects
}
