import React, {useContext} from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import {calendarItems} from '../constants'
import {TodoContext} from '../context'
function Calendar(){
    const {setSelectedList} = useContext(TodoContext)
    return (
        <div className='Calendar'>
            <div className='header'>
                <div className='title'>
                <i className="bi bi-calendar-check"></i>
                <p>Upcoming</p>
                </div>
                
            </div>
            <div className='items'>
                {
                    calendarItems.map( item =>
                        <div 
                        className='item' 
                        key={item}
                        onClick={() => setSelectedList(item)}
                        >
                            {item}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Calendar