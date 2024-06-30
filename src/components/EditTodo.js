import React, { useState } from "react";
import TodoForm from "./TodoForm";

function EditTodo() {
  const [text, setText] = useState();
  const [day, setDay] = useState();
  const [time, setTime] = useState();

  const lists = [
    { id: 1, name: "home", todos: 1 },
    { id: 1, name: "work", todos: 1 },
  ];
  function handleSubmit(e) {}
  return (
    <div className="EditTodo">
      <div className="header">Edit To Do</div>
      <div className="container">
        <TodoForm
          handleSubmit={handleSubmit}
          text={text}
          setText={setText}
          day={day}
          setDay={setDay}
          time={time}
          setTime={setTime}
          lists={lists}
        />
      </div>
    </div>
  );
}

export default EditTodo;
