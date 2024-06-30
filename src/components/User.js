import React from 'react';
import logo from "../assets/DefaultLogo.jpg";


function User(){
    return (
        <div className='User'>
            <div className="logo">
                <img src={logo} alt="User Logo" className="icon"/>
            </div>
            <div className="info">
                <p>Username</p>
                <a href="#">Logout</a>
            </div>
        </div>
    )
}

export default User