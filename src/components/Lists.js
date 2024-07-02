import React, { useState, useContext } from "react";
import AddList from "./AddList";
import List from "./List";
import { TodoContext } from "../context";
import "bootstrap-icons/font/bootstrap-icons.css";

function Lists() {
  const [showMenu, setShowMenu] = useState(true);
  const [edit, setEdit] = useState(false);
  const pencilState = edit ? "bi-pencil-fill" : "bi-pencil";
  
  
  const { lists, user } = useContext(TodoContext); 
  
  const userLists = lists.filter(list => list.uid === user.uid);

  return (
    <div className="Lists">
      <div className="header">
        <div className="title">
          <i className="bi bi-card-checklist"></i>
          <p>To Do Lists</p>
        </div>
        <div className="btns">
          {showMenu && userLists.length > 0 && (
            <span className="edit" onClick={() => setEdit(edit => !edit)}>
              <i className={`bi ${pencilState}`}></i>
            </span>
          )}
          <AddList />
        </div>
      </div>
      <div className="items">
        {userLists.map(list => (
          <List
            list={list}
            key={list.id}
            edit={edit}
          />
        ))}
      </div>
    </div>
  );
}

export default Lists;
