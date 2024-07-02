import React, {useContext} from 'react';
import Todo from './Todo';
import Week from './Week';
import { TodoContext } from '../context';

function Todos(){
    const {todos, selectedList} = useContext(TodoContext)
    
    return (
        <div className='Todos'>
            <div className='selected-list'>
                {selectedList}
            </div>
            <div className='todos'>
                {
                    selectedList === 'Week'?
                    <Week todos={todos}/>
                    :
                    todos.map(todo =>
                        <Todo todo={todo} key={todo.id}  />
                    )
                }
            </div>
        </div>
    )
}

export default Todos