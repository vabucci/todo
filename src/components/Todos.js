import React, {useContext} from 'react';
import Todo from './Todo';
import Week from './Week';
import { TodoContext } from '../context';

function Todos(){
    const {selectedList} = useContext(TodoContext)
    const todos = [
        {
            id : 'd54sd4',
            text : "Go for a run",
            time : "10:00 AM",
            date : "06/03/2021",
            day : "6",
            checked : true,
            color : '#000000',
            list : 'personal'
        },
        {
            id : 'd54fdf',
            text : "Meeting",
            time : "09:00 AM",
            date : "08/03/2021",
            day : "1",
            checked : true,
            color : '#00ff00',
            list : 'work'
        },
        
    ]
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
                        <Todo todo={todo} key={todo.id} />
                    )
                }
            </div>
        </div>
    )
}

export default Todos