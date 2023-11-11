import { useState } from "react";
import { useTodo } from "../Context/TodoContext";

function FormItem({ current }) {
  const { toggleCompleted, updateTodo, deleteTodo } = useTodo();
  const [updateTitle, setUpdateTitle] = useState(current.title);
  const [updatedTodo, setUpdatedTodo] = useState(current.toDo);
  const [isEditable, setEditable] = useState(false);
  const [hover, setHover] = useState(false);
  console.log(updatedTodo);

  return (
    <div key={current.id} className="todos">
      <input
        type="checkbox"
        className="complete"
        onChange={() => toggleCompleted(current.id)}
      />
      <div>
        <input
          type="text"
          value={updateTitle}
          readOnly={!isEditable}
          onChange={(e) => setUpdateTitle(e.target.value)}
          className={current.completed ? "strikeThrough" : ""}
        />
        <textarea
          type="text"
          value={updatedTodo}
          readOnly={!isEditable}
          onChange={(e) => setUpdatedTodo(e.target.value)}
          className={current.completed ? "strikeThrough" : ""}
        />
        <p>
          {Intl.DateTimeFormat("en", {
            dateStyle: "short",
            timeStyle: "short",
          }).format(current.date)}
        </p>
      </div>

      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          if (current.completed) return;
          setEditable((edit) => !edit);
          if (isEditable) {
            updateTodo(current.id, {
              id: Date.now(),
              toDo: updatedTodo,
              completed: false,
              date: Date.now(),
              title: updateTitle,
            });
          } else return;
        }}
      >
        {isEditable ? "📁" : "✏️"}
      </button>
      <button className="delete" onClick={() => deleteTodo(current.id)}>
        &#10006;
      </button>
      {hover && <p className="hoverMessage">{isEditable ? "save" : "edit"}</p>}
    </div>
  );
}

export default FormItem;
