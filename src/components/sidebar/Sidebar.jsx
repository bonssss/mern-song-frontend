import React, { useState } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import SongIcon from '@mui/icons-material/LibraryMusic';
import AddIcon from '@mui/icons-material/Add';
import TotalIcon from '@mui/icons-material/AccountBalance';
import DashboardIcon from '@mui/icons-material/Dashboard';


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="hamburger" onClick={toggleSidebar}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <ul className="sidebar-menu">
                <li className='list' > <Link to="/"><DashboardIcon/>Dashboard</Link></li>
                <li className='list'><Link to="/songform"> <AddIcon/> Add Song</Link></li>
                <li className='list'><Link to="/songs"> <SongIcon> </SongIcon>Song List</Link></li>
                <li className='list'><Link to="/totalinfo"><TotalIcon/>Total Information</Link></li>
                {/* Add more sidebar items as needed */}
            </ul>
        </div>
    );
};

export default Sidebar;
