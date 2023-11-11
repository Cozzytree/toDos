import { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todoContext, setTodoContent] = useState([]);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("todo_List"));
    if (!storage) return;
    if (storage && storage.length) setTodoContent(storage);
  }, []);

  useEffect(() => {
    localStorage.setItem("todo_List", JSON.stringify(todoContext));
  }, [todoContext]);

  const addContent = (newContent) => {
    setTodoContent((current) => [...current, newContent]);
  };

  const updateTodo = (id, todo) => {
    setTodoContent((current) =>
      current.map((currentTodo) => (currentTodo.id === id ? todo : currentTodo))
    );
  };

  const toggleCompleted = (id) => {
    setTodoContent((current) =>
      current.map((currentTodo) =>
        currentTodo.id === id
          ? { ...currentTodo, completed: !currentTodo.completed }
          : currentTodo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodoContent((current) =>
      current.filter((currentTodo) => currentTodo.id !== id)
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todoContext,
        addContent,
        updateTodo,
        deleteTodo,
        toggleCompleted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) throw new Error("used outside of the provider");
  return context;
};

export { TodoProvider, useTodo };
