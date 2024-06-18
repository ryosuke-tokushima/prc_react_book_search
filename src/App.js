import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import BookDetail from './BookDetail';
import Favorites from './Favorites';
import Header from './components/Header';
import { FavoritesProvider } from './FavoritesContext';
import Footer from './components/Footer';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/マイライブラリ" element={<Favorites />} />
        </Routes>
        <Footer />
      </Router>
    </FavoritesProvider>
  );
}

export default App;
