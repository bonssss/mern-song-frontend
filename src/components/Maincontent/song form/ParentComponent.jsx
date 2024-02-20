import React, { useState } from 'react';
import SongForm from '../../Maincontent/song form/SongForm';
import './parent.css';

const ParentComponent = () => {
  const [songs, setSongs] = useState([]);

  // Function to handle adding a new song
  const handleAddSong = (newSong) => {
    // Update the list of songs with the newly added song
    setSongs([...songs, newSong]);
  };

  return (
    <div className='parent'>
      <h1>Add a New Song</h1>
      {/* Render the SongForm component and pass the handleAddSong function as a prop */}
      <SongForm onSongAdded={handleAddSong} />
      {/* Render the list of songs */}
     
    </div>
  );
};

export default ParentComponent;
