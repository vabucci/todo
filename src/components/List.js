import React, { useState, useContext } from "react";
import RenameList from "./RenameList";
import Modal from "./Modal";
import "bootstrap-icons/font/bootstrap-icons.css";
import { TodoContext } from "../context";
import { db } from "../firebase";
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';


function List({ list, edit }) {
  const { defaultList, selectedList, setSelectedList } = useContext(TodoContext);
  const [showModal, setShowModal] = useState(false);

  const deleteList = async (list) => {
    const listDoc = doc(db, "lists", list.id);
  
    await deleteDoc(listDoc)
      .then(async () => {
        const todosQuery = query(collection(db, "todos"), where("listName", "==", list.name));
        const querySnapshot = await getDocs(todosQuery);
  
        const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
  
        await Promise.all(deletePromises);
  
        console.log("List and associated todos deleted");
      })
      .then( () => {
    if(selectedList === list.name)     {
      setSelectedList('Today');
    }
  })
      .catch((error) => {
        console.error("Error removing list: ", error);
      });
  };
  return (
    <div className="List">
      <div className="name"
      onClick={() => setSelectedList(list.name)}
      >
        {list.name}
        </div>
      <div className="btns">
        {edit ? 
          <div className="edit-delete">
            <span className="edit" onClick={() => setShowModal(true)}>
              <i class="bi bi-pencil"></i>
            </span>
            <span className="delete" onClick={ () => deleteList(list)}>
              <i class="bi bi-x-circle"></i>
            </span>
          </div>
         :
         list.numOfTodos === 0 ?
         "" 
         :
          <div className="total-todos">{list.numOfTodos}</div>
        }
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <RenameList list={list} setShowModal={setShowModal} />
      </Modal>
    </div>
  );
};

export default List;
