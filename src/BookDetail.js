import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircularProgress from '@mui/material/CircularProgress';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(response => response.json())
      .then(data => {
        setBook(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching book details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 1000,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          {book.volumeInfo.imageLinks && (
            <Img alt={book.volumeInfo.title} src={book.volumeInfo.imageLinks.thumbnail} />
          )}
        </Grid>
        <Grid item xs={12} md={8} container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h5" component="div">
                {book.volumeInfo.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Authors:</strong> {book.volumeInfo.authors.join(', ')}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Publisher:</strong> {book.volumeInfo.publisher}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Published Date:</strong> {book.volumeInfo.publishedDate}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Page Count:</strong> {book.volumeInfo.pageCount}
              </Typography>
              {book.volumeInfo.description && (
                <Typography variant="body2" gutterBottom>
                  <strong>Description:</strong> {parse(book.volumeInfo.description)}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BookDetail;
