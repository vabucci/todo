import React, { useState, useContext } from "react";
import { TodoContext } from "../context";
import ListForm from "./ListForm";
import { db, auth } from "../firebase";
import {
  doc,
  getDocs,
  query,
  where,
  updateDoc,
  collection,
} from "firebase/firestore";

function RenameList({ list, setShowModal }) {
  const { selectedList, setSelectedList } = useContext(TodoContext);
  const [newListName, setNewListName] = useState(list?.name || "");

  const renameList = async (list, newListName) => {
    const user = auth.currentUser;
    if (!user) {
      console.log("No user is authenticated");
      return;
    }

    const listCollection = collection(db, "lists");
    const listQuery = query(
      listCollection,
      where("name", "==", newListName),
      where("uid", "==", user.uid)
    );
    const querySnapshot = await getDocs(listQuery);
    if (!querySnapshot.empty) {
      alert("To do list already exists.");
      return;
    } else {
      const listDocRef = doc(db, "lists", list.id);
      if (list.uid === user.uid) {
        await updateDoc(listDocRef, { name: newListName });

        const todosCollection = collection(db, "todos");
        const todosQuery = query(
          todosCollection,
          where("listName", "==", list.name),
          where("uid", "==", user.uid)
        );
        const todosSnapshot = await getDocs(todosQuery);

        const updateTodosPromises = todosSnapshot.docs.map(async (todoDoc) => {
          const todoDocRef = doc(db, "todos", todoDoc.id);
          await updateDoc(todoDocRef, { listName: newListName });
        });

        await Promise.all(updateTodosPromises);

        if (selectedList === list.name) {
          setSelectedList(newListName);
        }
      } else {
        console.log("Attempt to rename a list not owned by the user.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await renameList(list, newListName);
    setShowModal(false);
  };

  return (
    <div className="RenameList">
      <ListForm
        handleSubmit={handleSubmit}
        heading="Edit List Name"
        value={newListName}
        setValue={setNewListName}
        setShowModal={setShowModal}
        confirmButtonText="Confirm"
      />
    </div>
  );
}

export default RenameList;
