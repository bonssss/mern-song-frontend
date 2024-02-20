import React, { useState, useEffect } from 'react';
import './SongList.css';

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [editSong, setEditSong] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('https://song-management-jna4.onrender.com/api/songs');
        if (!response.ok) {
          throw new Error('Failed to fetch songs');
        }
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  const handleEdit = (id) => {
    setEditSong(id);
  };

  const handleCancelEdit = () => {
    setEditSong(null);
    setEditedData({});
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await fetch(`https://song-management-jna4.onrender.com/api/songs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });
      if (!response.ok) {
        throw new Error('Failed to update song');
      }
      const updatedSong = await response.json();
      setSongs(songs.map(song => (song._id === id ? updatedSong : song)));
      setEditSong(null);
      setEditedData({});
    } catch (error) {
      console.error('Error updating song:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://song-management-jna4.onrender.com/api/songs/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete song');
      }
      setSongs(songs.filter(song => song._id !== id));
    } catch (error) {
      console.error('Error deleting song:', error);
      alert('Failed to delete the song');
    }
  };


  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="song-list-container">
      <h2 className="song-list-header">Song List</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Songs By Title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="table-responsive">
        <table className="song-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSongs.map(song => (
              <tr key={song._id}>
                <td>
                  {editSong === song._id ? (
                    <input type="text" name="title" value={editedData.title || song.title} onChange={handleInputChange} className="edit-input" />
                  ) : (
                    song.title
                  )}
                </td>
                <td>
                  {editSong === song._id ? (
                    <input type="text" name="artist" value={editedData.artist || song.artist} onChange={handleInputChange} className="edit-input" />
                  ) : (
                    song.artist
                  )}
                </td>
                <td>
                  {editSong === song._id ? (
                    <input type="text" name="album" value={editedData.album || song.album} onChange={handleInputChange} className="edit-input" />
                  ) : (
                    song.album
                  )}
                </td>
                <td>
                  {editSong === song._id ? (
                    <input type="text" name="genre" value={editedData.genre || song.genre} onChange={handleInputChange} className="edit-input" />
                  ) : (
                    song.genre
                  )}
                </td>
                <td className="edit-actions">
                  {editSong === song._id ? (
                    <>
                      <button onClick={() => handleSaveEdit(song._id)}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className='edit' onClick={() => handleEdit(song._id)}>Edit</button>
                      <button className="delete" onClick={() => handleDelete(song._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SongList;
