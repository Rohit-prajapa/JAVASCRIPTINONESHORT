import { useEffect, useState } from "react";
import { Todoprovider } from "./Context";
import { TodoForm, TodoItem } from "./components";
import "./App.css";

function App() {
  // Load saved todos when the app starts
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Error loading todos:", error);
      return [];
    }
  });

  // Add a new todo
  const addTodo = (todo) => {
    setTodos((prev) => [
      { id: Date.now(), ...todo, completed: false },
      ...prev,
    ]);
  };

  // Update a todo
  const UpdateTodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? updatedTodo : prevTodo)),
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Toggle completion status
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? {
              ...prevTodo,
              completed: !prevTodo.completed,
            }
          : prevTodo,
      ),
    );
  };

  // Save todos whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Todoprovider
      value={{
        todos,
        addTodo,
        UpdateTodo,
        deleteTodo,
        toggleComplete,
      }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>

          <div className="mb-4">
            <TodoForm />
          </div>

          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Todoprovider>
  );
}

export default App;
