import { useState, useEffect, useContext } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import moment from "moment";



export function useTodos() {
  const [todos, setTodos] = useState([]);
  const user = auth.currentUser;
  useEffect(() => {
    if (!user) {
      setTodos([]); 
      return;
    }

    const q = query(collection(db, "todos"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todosData);
    });

    return () => unsubscribe();
  }, [user]); 

  return todos;
}

export function useFilterTodos(todos, selectedList) {
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    let data;
    const todayDateFormatted = moment().format('MM/DD/YYYY');
    if (selectedList === 'Today') {
      data = todos.filter(todo => todo.date === todayDateFormatted);
    } else if (selectedList === 'Week') {
      data = todos.filter(todo => {
        const todoDate = moment(todo.date, 'MM/DD/YYYY');
        const todayDate = moment(todayDateFormatted, 'MM/DD/YYYY');

        const diffDays = todoDate.diff(todayDate, 'days');
        return diffDays >= 0 && diffDays < 7;
      });
    } else if (selectedList === "All") {
      data = todos;
    } else {
      data = todos.filter(todo => todo.listName === selectedList);
    }

    setFilteredTodos(data);
  }, [todos, selectedList]);

  return filteredTodos;
}

export function useLists() {
  const [lists, setLists] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      setLists([]);
      return;
    }

    const q = query(collection(db, "lists"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const listsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLists(listsData);
    });

    return () => unsubscribe();
  }, [user]);

  return lists;
}

export function useListsWithStats(lists, todos) {
  const [listsWithStats, setListsWithStats] = useState([]);

  useEffect(() => {
    const data = lists.map((list) => {
      return {
        numOfTodos: todos.filter(todo => todo.listName === list.name && !todo.checked).length,
        ...list
      };
    });

    setListsWithStats(data);
  }, [lists, todos]);

  return listsWithStats;
}
