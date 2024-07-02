import React, { useState, useContext, useEffect, useRef } from "react";
import TodoForm from "./TodoForm";
import { TodoContext } from "../context";
import { db, auth } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import moment from "moment";

function EditTodo() {
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoList, setTodoList] = useState("");
  const [isOverflowing, setIsOverflowing] = useState(false);

  const { selectedTodo, lists, setSelectedTodo } = useContext(TodoContext);
  const containerRef = useRef(null);

  useEffect(() => {
    if (selectedTodo) {
      setText(selectedTodo.text);
      setDay(moment(selectedTodo.date, "MM/DD/YYYY"));
      setTime(moment(selectedTodo.time, "hh:mm aa"));
      setTodoList(selectedTodo.listName);
    }
  }, [selectedTodo]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        setIsOverflowing(container.scrollHeight > container.clientHeight);
      }
    };
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const updateTodo = async () => {
      if (selectedTodo) {
        
        const user = auth.currentUser;
        if (user && selectedTodo.uid === user.uid) { 
          const todoDocRef = doc(db, "todos", selectedTodo.id);
          try {
            await updateDoc(todoDocRef, {
              text,
              date: moment(day).format("MM/DD/YYYY"),
              day: moment(day).format("d"),
              time: moment(time).format("hh:mm A"),
              listName: todoList,
            });
            console.log("Todo updated successfully.");
          } catch (error) {
            console.error("Error updating todo:", error);
          }
        } else {
          console.log("Attempt to update a todo not owned by the user.");
        }
      }
    };

    updateTodo();
  }, [text, day, time, todoList, selectedTodo]);

  function handleSubmit(e) {}
  return (
    <div>
      {selectedTodo && (
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
              todoList={todoList}
              setTodoList={setTodoList}
              lists={lists}
            />
          </div>
          <div className={`confirm-wrapper`}
          onClick={ () => setSelectedTodo(undefined)}
          >
            <button>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditTodo;
