import { useState } from "react";
import { useTodo } from "../Context/TodoContext";
import FormItem from "./formItem";

function Form() {
  const { addContent, todoContext } = useTodo();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  function handleForm(e) {
    e.preventDefault();
    if (!title || !description) return;
    const newTodo = {
      id: new Date().getMilliseconds(),
      title: title,
      toDo: description,
      completed: false,
      date: Date.now(),
    };

    addContent(newTodo);
    setTitle("");
    setDescription("");
  }

  return (
    <>
      <div className="form" onSubmit={handleForm}>
        <form>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name=""
            id=""
            cols="50"
            rows="1"
            placeholder="to do's"
          ></textarea>
          <button>Add</button>
        </form>
      </div>
      <div className="todoItem">
        {todoContext.map((current) => (
          <FormItem key={current.id} current={current} />
        ))}
      </div>
    </>
  );
}

export default Form;
