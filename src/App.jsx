import { TodoProvider } from "./Context/TodoContext";

import Form from "./Components/form";

function App() {
  return (
    <TodoProvider>
      <h1 className="title">Manage ToDo&apos;s</h1>
      <Form />
    </TodoProvider>
  );
}

export default App;
