import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface TodoState {
  todoLists: Todo[];
}

export type priority = "Low" | "Medium" | "High";

export type Todo = {
  id: string;
  text: string;
  priority: priority;
  date: string;
  isDone: boolean;
};

// Define the initial state using that type
const initialState: TodoState = {
  todoLists: [],
};

export const todoSlice = createSlice({
  name: "todo",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todoLists.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todoLists = state.todoLists.filter(
        (todo) => todo.id !== action.payload
      );
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const newLists = state.todoLists.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      state.todoLists = newLists;
    },
    toggleCheckBox: (state, action: PayloadAction<string>) => {
      const newLists = state.todoLists.map((todo) =>
        todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      );
      state.todoLists = newLists;
    },
  },
});

export const { addTodo, removeTodo, editTodo, toggleCheckBox } =
  todoSlice.actions;
export default todoSlice.reducer;
