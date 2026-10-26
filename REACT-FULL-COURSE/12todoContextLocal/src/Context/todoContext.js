import { createContext, useContext } from "react";

export const todoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "todos Msg",
      completed: false,
    },
  ],
  addTodo: (todo) => {},
  UpdateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
});

export const Usetodo = () => {
  return useContext(todoContext);
};

export const Todoprovider = todoContext.Provider;
