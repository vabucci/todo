import React, { useState, useContext, useEffect } from "react";
import Modal from "./Modal";
import TodoForm from "./TodoForm";
import { TodoContext } from "../context";
import { calendarItems } from "../constants";
import { db, auth } from "../firebase";
import { collection, addDoc } from 'firebase/firestore';
import moment from "moment";
import randomcolor from 'randomcolor';

function AddTodo() {
  const { lists, selectedList } = useContext(TodoContext);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoList, setTodoList] = useState(selectedList);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const user = auth.currentUser;  
    if (!user) {
      console.log("No user is authenticated");
      return;
    }

    if (text && !calendarItems.includes(todoList)) {
      const docRef = await addDoc(collection(db, 'todos'), {
        text: text,
        date: moment(day).format('MM/DD/YYYY'),
        day: moment(day).format('d'),
        time: moment(time).format('hh:mm A'),
        checked: false,
        color: randomcolor(),
        listName: todoList,
        uid: user.uid 
      });

      setShowModal(false);
      setText("");
      setDay(new Date());
      setTime(new Date());
    }
  };

  useEffect(() => {
    setTodoList(selectedList);
  }, [selectedList]);

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
          todoList={todoList}
          setTodoList={setTodoList}
          lists={lists}
          showButtons={true}
          setShowModal={setShowModal}
        />
      </Modal>
    </div>
  );
}

export default AddTodo;
