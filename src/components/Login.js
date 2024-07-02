import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError("Failed to login: " + error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await createDefaultTodoList(userCredential.user.uid);
    } catch (error) {
        setError("Failed to create account: " + error.message);
    }
};

const createDefaultTodoList = async (userId) => {
    const defaultList = {
        name: "To Do",
        uid: userId,
        todos: []  
    };

    try {
        await addDoc(collection(db, 'lists'), defaultList);
        console.log('Default todo list created');
    } catch (error) {
        console.error('Error creating default todo list', error);
    }
};

  return (
    <div className="login">
        <div className="login-form">
      <h2>Login / Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
      <div className="form-group">
        <input
          type="email"
          className="form-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button type="submit" className="login-button">Login</button>
        <button type="button" className="signup-button" onClick={handleSignUp} style={{ marginTop: '10px' }}>Sign Up</button>
      </form>
      </div>
    </div>
  );
}

export default Login;
