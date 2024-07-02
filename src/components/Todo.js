import React, { useState, useContext } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { blueGrey } from "@mui/material/colors";
import { db } from "../firebase";
import {
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import moment from "moment";
import { TodoContext } from "../context";

function Todo({ todo }) {
  const circleColor = todo.color;
  const [hover, setHover] = useState(false);
  const {selectedTodo, setSelectedTodo} = useContext(TodoContext)

  const handleDelete = todo => {
    deleteTodo(todo)

    if(selectedTodo === todo) {
      setSelectedTodo(undefined)
    }
  }

  const deleteTodo = async (todo) => {
    const todoDoc = doc(db, "todos", todo.id);

    await deleteDoc(todoDoc)
      .then(() => {
        console.log("Todo deleted");
      })
      .catch((error) => {
        console.error("Error removing todo: ", error);
      });
  };

  const checkTodo = async (todo) => {
    const todoDocRef = doc(db, "todos", todo.id);

    try {
      await updateDoc(todoDocRef, {
        checked: !todo.checked,
      });
      console.log("Todo checked status updated successfully.");
    } catch (error) {
      console.error("Error updating todo checked status:", error);
    }
  };

  const repeatNextDay = async (todo) => {
    const nextDayDate = moment(todo.date, "MM/DD/YYYY").add(1, "days");

    const repeatedTodo = {
      ...todo,
      checked: false,
      date: nextDayDate.format("MM/DD/YYYY"),
      day: nextDayDate.format("d"),
    };

    delete repeatedTodo.id;

    try {
      const docRef = await addDoc(collection(db, "todos"), repeatedTodo);
      console.log("Repeated todo added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding repeated todo: ", error);
    }
  };

  return (
    <div className="Todo">
      <div
        className="todo-container"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="check-todo" onClick={() => checkTodo(todo)}>
          {todo.checked ? (
            <span className="checked">
              <i
                className="bi bi-check-circle-fill"
                style={{ color: "#bebebe" }}
              ></i>
            </span>
          ) : (
            <span className="unchecked">
              <i className="bi bi-circle" style={{ color: circleColor }}></i>
            </span>
          )}
        </div>
        <div className="text"
          onClick={() => setSelectedTodo(todo)}
        >
          <p style={{ color: todo.checked ? "rgb(200,200,200)" : "#000000" }}>
            {todo.text}
          </p>
          <span>
            {todo.time} - {todo.listName}
          </span>
          <div className={`line ${todo.checked ? "line-through" : ""}`}></div>
        </div>
        <div className="add-to-next-day" onClick={() => repeatNextDay(todo)}>
          {todo.checked && (
            <span>
              <i className="bi bi-arrow-clockwise"></i>
            </span>
          )}
        </div>
        <div className="delete-todo" onClick={() => handleDelete(todo)}>
          {(hover || todo.checked) && (
            <span>
              <i className="bi bi-trash"></i>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
