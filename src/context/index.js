import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useTodos, useLists, useListsWithStats, useFilterTodos } from '../hooks';
import { onAuthStateChanged } from 'firebase/auth';

const TodoContext = createContext();

function TodoContextProvider({ children }) {
    const defaultList = 'Today';
    const [selectedList, setSelectedList] = useState(defaultList);
    const [selectedTodo, setSelectedTodo] = useState(undefined);
    const [user, setUser] = useState(null); 

    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); 
        });
        return () => unsubscribe(); 
    }, []);

    const todos = useTodos(user); 
    const lists = useLists(user);
    const listsWithStats = useListsWithStats(lists, todos);
    const filteredTodos = useFilterTodos(todos, selectedList);

    return (
        <TodoContext.Provider value={{
            user,
            selectedList,
            setSelectedList,
            todos: filteredTodos,
            lists: listsWithStats,
            selectedTodo,
            setSelectedTodo
        }}>
            {children}
        </TodoContext.Provider>
    );
}

export { TodoContextProvider, TodoContext };
