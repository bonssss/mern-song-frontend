import React, { useState } from 'react';
import './songform.css'; // Import custom styles

const SongForm = ({ onSongAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form data:', formData);
      const response = await fetch('https://song-management-jna4.onrender.com/api/songs', { // Change the port to your backend server's port
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);
      if (!response.ok) {
        throw new Error('Failed to add song');
      }
      onSongAdded(responseData); // Call the onSongAdded function passed as a prop
      setFormData({ title: '', artist: '', album: '', genre: '' });
    } catch (error) {
      console.error('Error adding song:', error);
    }
  };
  

  return (
    <form className="song-form-container" onSubmit={handleSubmit}>
      {/* Input fields for title, artist, album, and genre */}
      <div className="input-container">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div className="input-container">
        <label htmlFor="artist">Artist:</label>
        <input type="text" id="artist" name="artist" value={formData.artist} onChange={handleChange} required />
      </div>

      <div className="input-container">
        <label htmlFor="album">Album:</label>
        <input type="text" id="album" name="album" value={formData.album} onChange={handleChange} required />
      </div>

      <div className="input-container">
        <label htmlFor="genre">Genre:</label>
        <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} required />
      </div>

      {/* Submit button */}
      <button type="submit">Save</button>
    </form>
  );
};

export default SongForm;
