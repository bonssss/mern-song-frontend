import React, { useState, useEffect } from "react";
import "./statistics.css";

import SongIcon from '@mui/icons-material/LibraryMusic';
import AddIcon from '@mui/icons-material/Add';
import ArtistIcon from '@mui/icons-material/Person';
import GenreIcon from '@mui/icons-material/Category';

const Statistics = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch("hhttps://song-management-jna4.onrender.com/api/statistics");
        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }
        const data = await response.json();
        setStatistics(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="statistics-container">
      <h2 className="heading">Statistics</h2>
      {statistics ? (
        <div>
          <div className="statistics-contain">
            <p className="info"> <SongIcon/>Total Songs: {statistics.totalSongs}</p>
            <p className="info"><ArtistIcon/>Total Artists: {statistics.totalArtists}</p>
            <p className="info"> <ArtistIcon/>Total Albums: {statistics.totalAlbums}</p>
            <p className="info"><GenreIcon/>Total Genres: {statistics.totalGenres}</p>
          </div>
          <div className="total-info">
            <h3 className="sub-heading">Genre Counts</h3>
            <ul className="list">
              {statistics.genreCounts.map((genre) => (
                <li key={genre._id} className="list-item">
                  {genre._id}: {genre.count}
                </li>
              ))}
            </ul>
            <h3 className="sub-heading">Artist Counts</h3>
            <ul className="list">
              {statistics.artistCounts.map((artist) => (
                <li key={artist._id} className="list-item">
                  {artist._id}: {artist.count}
                </li>
              ))}
            </ul>
            <h3 className="sub-heading">Album Counts</h3>
            <ul className="list">
              {statistics.albumCounts.map((album) => (
                <li key={album._id} className="list-item">
                  {album._id}: {album.count}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading statistics...</p>
      )}
    </div>
  );
};

export default Statistics;
