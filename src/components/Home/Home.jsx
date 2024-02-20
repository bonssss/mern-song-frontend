import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Container } from '@mui/material';
import './Home.css'; // Import the CSS file
import SongForm from '../Maincontent/song form/SongForm';
import ParentComponent from '../Maincontent/song form/ParentComponent';
import SongIcon from '@mui/icons-material/LibraryMusic';
import AddIcon from '@mui/icons-material/Add';
import ArtistIcon from '@mui/icons-material/Person';
import GenreIcon from '@mui/icons-material/Category';
import AlbumIcon from '@mui/icons-material/Album'


const Home = () => {
  const [statistics, setStatistics] = useState({
    totalSongs: 0,
    totalArtists: 0,
    // Add more statistics as needed
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from your backend API
      const response = await fetch('https://song-management-jna4.onrender.com/api/statistics');
      const data = await response.json();
      // Update the statistics state with the fetched data
      setStatistics(data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {/* Number Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className="number-card"> {/* Add a custom class for the card */}
            <CardContent>
              <Typography variant="h5" component="h2">
               <SongIcon/> Total Songs
              </Typography>
              <Typography variant="h4">
                {statistics.totalSongs}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="number-card"> {/* Add a custom class for the card */}
            <CardContent>
              <Typography variant="h5" component="h2">
               <ArtistIcon/> Total Artists
              </Typography>
              <Typography variant="h4">
                {statistics.totalArtists}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Add more number cards for other statistics */}
        {/* Total Albums */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className="number-card"> {/* Add a custom class for the card */}
            <CardContent>
              <Typography variant="h5" component="h2">
                Total Albums
              </Typography>
              <Typography variant="h4">
                {statistics.totalAlbums}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Total Genres */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className="number-card"> {/* Add a custom class for the card */}
            <CardContent>
              <Typography variant="h5" component="h2">
              <GenreIcon/>  Total Genres
              </Typography>
              <Typography variant="h4">
                {statistics.totalGenres}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Include your additional components */}
      <ParentComponent/>
    </Container>
  );
};

export default Home;
