import React, { useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import Navbar from './components/Navbar';
import movieListData from './data/movieListData.json';
import movieDetailData from './data/movieDetailData.json';

const StyledMovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 70px;
`;

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar{
    display: none;
  }

  body {
    background-color: ${props => props.darkMode ? 'black' : 'white'};
    //color: ${props => props.darkMode ? 'white' : 'black'};
  }
  
  /* 특정 페이지 스타일을 변경할 때는 여기서 App 내부만을 타겟으로 스타일을 조정 */
  main { //non-Backdrop 효과 없어서 결국 index로 조절함 ㅠ
    background-color: ${props => props.darkMode ? 'black' : 'white'};
    //color: ${props => props.darkMode ? 'white' : 'black'};
  }
`;

const App = () => {
  const [movies, setMovies] = useState(movieListData.results);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    setSelectedMovie(movieDetailData.results[0]);
    navigate('/MovieDetail');
  };

  return (
    <>
      <GlobalStyle darkMode={darkMode} />
      <Navbar setDarkMode={setDarkMode} />
      <main>
        <Routes>
          {/* 영화 목록 페이지 */}
          <Route
            path="/"
            element={
              <StyledMovieList>
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    title={movie.title}
                    poster={movie.poster_path}
                    onClick={() => handleMovieClick(movie)}
                  />
                ))}
              </StyledMovieList>
            }
          />

          {/* 영화 상세 페이지 */}
          <Route
            path="/MovieDetail"
            element={
              selectedMovie && (
                // &&는 단락 평가를 이용하여 좌측 값이 true일 때만 우측 값을 평가하는 연산자
                <MovieDetail
                  movie={selectedMovie}
                  onClick={() => handleMovieClick(selectedMovie)}
                  similarMovies={movies.slice(0, 14)}
                />
              )
            }
          />
        </Routes>
      </main>
    </>
  );
};

export default App;