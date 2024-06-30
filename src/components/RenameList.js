import React, {useState} from "react";
import ListForm from "./ListForm";


function RenameList({list, setShowModal}) {
const [newListName, setNewListName] = useState(list.name)

function handleSubmit(e) {


}
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
