import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import { useFavorites } from './FavoritesContext';
import { Link } from 'react-router-dom';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div>
      <div class="mt-6 px-6 text-2xl font-bold text-slate-900">マイライブラリ</div>
      <Grid container spacing={2} className="book-list">
        {favorites.map((book) => (
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
                      <IconButton onClick={() => removeFavorite(book.id)}>
                        <FavoriteIcon />
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

export default Favorites;
