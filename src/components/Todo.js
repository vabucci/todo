import React, {useState} from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { blueGrey } from "@mui/material/colors";


function Todo({ todo }) {
  const circleColor = todo.color;
  const [hover, setHover] = useState(false)
  return (
    <div className="Todo">
      <div className="todo-container" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(true)}>
        <div className="check-todo">
          {todo.checked ? (
            <span className="checked">
              <i
                class="bi bi-check-circle-fill"
                style={{ color: "#bebebe" }}
              ></i>
            </span>
          ) : (
            <span className="unchecked">
              <i className="bi bi-circle" style={{ color: circleColor }}></i>
            </span>
          )}
        </div>
        <div className="text">
          <p style={{ color: todo.checked ? "rgb(200,200,200)" : "#000000" }}>
            {todo.text}
          </p>
          <span>
            {todo.time} - {todo.list}
          </span>
          <div className={`line ${todo.checked ? "line-through" : ""}`}></div>
        </div>
        <div className="add-to-next-day">
          {todo.checked && 
            <span>
              <i className="bi bi-arrow-clockwise"></i>
            </span>
          }
        </div>
        <div className="delete-todo">
            {
                (hover || todo.checked) &&
                <span>
                    <i className="bi bi-trash"></i>
                </span>
            }
        </div>
      </div>
    </div>
  );
}

export default Todo;
