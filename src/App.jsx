import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import SongList from './components/Maincontent/song form/SongList';
import SongForm from './components/Maincontent/song form/SongForm';
import './app.css'; // Import custom styles
import Home from './components/Home/Home';
import ParentComponent from './components/Maincontent/song form/ParentComponent';
import Statistics from './components/statistics/Statistics';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-container">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/songs" element={<SongList />} />
              <Route exact path="/songform" element={<ParentComponent />} />
              <Route exact path="/totalinfo" element={<Statistics />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
