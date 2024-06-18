import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useFavorites } from './FavoritesContext';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';



const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Home = () => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [books, setBooks] = useState([]);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    if (inputValue) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${inputValue}`)
        .then((response) => response.json())
        .then((data) => {
          const books = data.items.map((item) => ({
            id: item.id,
            title: item.volumeInfo.title,
            thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null,
            authors: item.volumeInfo.authors ? item.volumeInfo.authors : [],
            publisher: item.volumeInfo.publisher ? item.volumeInfo.publisher : 'Unknown',
          }));
          setOptions(books);
          setBooks(books);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [inputValue]);

  const handleFavoriteToggle = (book) => {
    if (favorites.some(favorite => favorite.id === book.id)) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
  };

  return (
    <div>
      <div class="mt-6 px-6 text-2xl font-bold text-slate-900">検索する</div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mainHeight="20vh"
      >
      <Autocomplete
        id="search-auto-complete"
        options={options}
        getOptionLabel={(option) => option.title}
        style={{ width: 1000 }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="本を検索" variant="outlined" />}
      />
      </Box>
      <Grid container spacing={2} className="book-list">
        {books.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4} className="book-item">
            <Paper
              sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                    <Img alt={book.title} src={book.thumbnail} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Link to={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
                        <Typography gutterBottom variant="subtitle1" component="div" sx={{ textAlign: 'left' }}>
                          {book.title}
                        </Typography>
                      </Link>  
                      <Typography variant="body2" gutterBottom sx={{ textAlign: 'left' }}>
                        <strong>Authors:</strong> {book.authors.join(', ')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                        <strong>Publisher:</strong> {book.publisher}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => handleFavoriteToggle(book)}>
                        {favorites.some(favorite => favorite.id === book.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
