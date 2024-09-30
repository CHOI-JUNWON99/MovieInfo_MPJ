import React, { useState } from 'react';
import styled from 'styled-components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import Navbar from './components/Navbar';
import movieListData from './data/movieListData.json';

const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 70px; /* Navbar의 높이만큼 상단에 여백 추가 */
`;

const App = () => {
  const [movies, setMovies] = useState(movieListData.results);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    navigate('/MovieDetail');
  };

  return (
    <>
      <Navbar />
      <Routes>
        {/* 영화 목록 페이지 */}
        <Route
          path="/"
          element={
            <MovieList>
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  poster={movie.poster_path}
                  rating={movie.vote_average}
                  onClick={() => handleMovieClick(movie)}
                />
              ))}
            </MovieList>
          }
        />

        {/* 영화 상세 페이지 */}
        <Route
          path="/MovieDetail"
          element={<MovieDetail movie={selectedMovie} />}
        />
      </Routes>
    </>
  );
};

export default App;