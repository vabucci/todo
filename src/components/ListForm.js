import React from "react";

function ListForm({handleSubmit, heading, value, setValue, setShowModal, confirmButtonText}) {
  return (
    <form onSubmit={handleSubmit} className="ListForm">
      <h3>{heading}</h3>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="List Name..."
        autoFocus
      />
      <button className="cancel" role="button" onClick={() => setShowModal(false)}>Cancel</button>
      <button className="confirm">{confirmButtonText}</button>
    </form>
  );
}

export default ListForm