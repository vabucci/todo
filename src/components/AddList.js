import React, { useState } from "react";
import Modal from "./Modal";
import ListForm from "./ListForm";
import "bootstrap-icons/font/bootstrap-icons.css";

function AddList() {
  const [showModal, setShowModal] = useState(false);
    const [ListName, setListName] = useState('')
  function handleSubmit(e) {
  }
  return (
    <div className="AddList">
      <div className="add-button">
        <span onClick={() => setShowModal(true)}>
          <i class="bi bi-plus"></i>
        </span>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <ListForm 
            handleSubmit={handleSubmit}
            heading = "New To Do List"
            value={ListName}
            setValue={setListName}
            setShowModal={setShowModal}
            confirmButtonText='+ To Do List'
        />
      </Modal>
    </div>
  );
}

export default AddList;
