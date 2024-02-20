import React from 'react';
import './navbar.css'; // Import CSS file
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
    const handleLogout = () => {
        // Perform logout action
        onLogout();
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                {/* <img src="/logo.png" alt="Logo" /> */}
                <h3>SONG-APP</h3>
            </div>
            <div className="navbar-links">
                <ul className='list-item'>
                    <li className ="list"><Link to='/'>Home</Link> </li>
                    <li className ="list"><Link to="/songs">Songs</Link> </li>
                    {/* Conditionally render logout button */}
                    {isLoggedIn && (
                        <li><button onClick={handleLogout}>Logout</button></li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
