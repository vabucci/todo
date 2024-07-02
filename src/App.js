import "./App.css";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import User from "./components/User";
import Calendar from "./components/Calendar";
import AddTodo from "./components/AddTodo";
import Lists from "./components/Lists";
import EditTodo from "./components/EditTodo";
import Todos from "./components/Todos";
import Login from "./components/Login";
import SignOut from "./components/SignOut";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      {user ? (
        <>
          <Sidebar>
            <SignOut />
            <AddTodo />
            <Calendar />
            <Lists />
          </Sidebar>
          <Main>
            <Todos />
            <EditTodo />
          </Main>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
