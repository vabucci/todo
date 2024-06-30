import React, { useState } from "react";
import Modal from "./Modal";
import TodoForm from "./TodoForm";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import {
//   DatePicker,
//   TimePicker,
//   LocalizationProvider,
// } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';

function AddTodo() {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const lists = [
    {id : 1, name : "home", todos : 1},
    {id : 1, name : "work", todos : 1},
    
  ]

  function handleSubmit(e) {
  }
  return (
    <div className="AddTodo">
      <div className="btn">
        <button onClick={() => setShowModal(true)}>+ Todo</button>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <TodoForm 
        handleSubmit={handleSubmit}
        heading='Create New To Do'
        text={text}
        setText={setText}
        day={day}
        setDay={setDay}
        time={time}
        setTime={setTime}
        lists={lists}
        showButtons={true}
        setShowModal={setShowModal}
        />
      </Modal>
    </div>
  );
}

export default AddTodo;
