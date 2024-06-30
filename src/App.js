import "./App.css";
import React from "react"
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import User from "./components/User";
import Calendar from "./components/Calendar";
import AddTodo from "./components/AddTodo";
import Lists from "./components/Lists";
import EditTodo from "./components/EditTodo";
import Todos from "./components/Todos";

function App() {
  return (
    <div className="App">
      <Sidebar>
        <User />
        <AddTodo />
        <Calendar />
        <Lists /> 
      </Sidebar>
      <Main>
        <Todos />
        <EditTodo />
      </Main>
    </div>
  );
}

export default App;
