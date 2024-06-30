import React, { useState } from "react";
import AddList from "./AddList";
import List from "./List";
import "bootstrap-icons/font/bootstrap-icons.css";

function Lists() {
  const [showMenu, setShowMenu] = useState(true);
  const [edit, setEdit] = useState(false);
  const pencilState = edit ? "bi-pencil-fill" : "bi-pencil";
  const lists = [
    {id : 1, name : "home", todos : 1},
    {id : 1, name : "work", todos : 1},
    
  ]
  return (
    <div className="Lists">
      <div className="header">
        <div className="title">
          <i class="bi bi-card-checklist"></i>
          <p>To Do Lists</p>
        </div>
        <div className="btns">
          {showMenu && lists.length > 0 &&(
            <span className="edit" onClick={ () => setEdit(edit => !edit)}>
              <i className={`bi ${pencilState}`}></i>

            </span>
          )}
          <AddList />
          <span className='arrow'>
            <i class="bi bi-caret-up"></i>
          </span>
        </div>
      </div>
      <div className="items">
        {
          lists.map( list => 
            <List 
                list={list}
                key={list.id}
                edit={edit}
            />
          )
        }
      </div>
    </div>
  );
}

export default Lists;
