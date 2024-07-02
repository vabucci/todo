import React, { useState } from "react";
import Modal from "./Modal";
import ListForm from "./ListForm";
import "bootstrap-icons/font/bootstrap-icons.css";
import { db, auth } from "../firebase"; 
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

function AddList() {
  const [showModal, setShowModal] = useState(false);
  const [listName, setListName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;  
    if (!user) {
      console.log("No user is authenticated");
      return;
    }

    if (listName) {
      const q = query(
        collection(db, 'lists'), 
        where('name', '==', listName), 
        where('uid', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(collection(db, 'lists'), {
          name: listName,
          uid: user.uid  
        });
        setShowModal(false);
        setListName("");
      } else {
        alert("Project Already Exists");
      }
    }
  };

  return (
    <div className="AddList">
      <div className="add-button">
        <span onClick={() => setShowModal(true)}>
          <i className="bi bi-plus"></i>
        </span>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <ListForm
          handleSubmit={handleSubmit}
          heading="New To Do List"
          value={listName}
          setValue={setListName}
          setShowModal={setShowModal}
          confirmButtonText="+ To Do List"
        />
      </Modal>
    </div>
  );
}

export default AddList;
