import React, {useEffect, useRef, useContext} from 'react';

import {TodoContext} from '../context';

function Sidebar({children}){
    const sidebarRef = useRef();
    const {setSelectedTodo} = useContext(TodoContext)

    useEffect (() => {
        document.addEventListener('click', handleClick)

        return () => document.removeEventListener('click', handleClick)
    })

    const handleClick = (e) => {
        if (e.target === sidebarRef.current || sidebarRef.current.contains(e.target)){
            setSelectedTodo(undefined)
        }
    }
    return (
        <div className='Sidebar'
            ref={sidebarRef}
        >
            {children}
        </div>
    )
}

export default Sidebar