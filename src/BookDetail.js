import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{book.volumeInfo.title}</h1>
      {book.volumeInfo.imageLinks && (
        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
      )}
      <h2>Authors: {book.volumeInfo.authors.join(', ')}</h2>
      <h3>Publisher: {book.volumeInfo.publisher}</h3>
      <p>{book.volumeInfo.description}</p>
    </div>
  );
};

export default BookDetail;
