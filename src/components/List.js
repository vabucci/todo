import React, { useState, useContext } from "react";
import RenameList from "./RenameList";
import Modal from "./Modal";
import "bootstrap-icons/font/bootstrap-icons.css";
import { TodoContext } from "../context";

function List({ list, edit }) {
  const { setSelectedList } = useContext(TodoContext);
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="List">
      <div className="name"
      onClick={() => setSelectedList(list.name)}
      >
        {list.name}
        </div>
      <div className="btns">
        {edit ? (
          <div className="edit-delete">
            <span className="edit" onClick={() => setShowModal(true)}>
              <i class="bi bi-pencil"></i>
            </span>
            <span className="delete">
              <i class="bi bi-x-circle"></i>
            </span>
          </div>
        ) : (
          <div className="total-todos">{list.todos}</div>
        )}
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <RenameList list={list} setShowModal={setShowModal} />
      </Modal>
    </div>
  );
}

export default List;
