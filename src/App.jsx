import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import Navbar from './components/Navbar';
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'

const StyledMovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 70px;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.darkMode ? 'black' : 'white'};
  }
  main {
    background-color: ${props => props.darkMode ? 'black' : 'white'};
  }
`;

const App = () => {
  const [movies, setMovies] = useState([]);

  const [darkMode, setDarkMode] = useState(false);
  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();

  useEffect(() => { // TMDB API
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWQ3MjVkZWFiZTE3NzVlZWRlMGZlNzlmODY2MmQxNiIsIm5iZiI6MTcyNzkzODQyNC44Mjg2ODUsInN1YiI6IjY2ZmUzYjM3MTU5MmVmMWJhOTg0Y2NhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ILRauoYs8ArRqkEwruYhVQGfkiBn600Gc9jY4h2Iz1k'
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', options);
        const data = await response.json();
        setMovies(data.results); // API에서 받은 영화 목록 데이터를 상태로 저장
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => { //장르API
    const fetchGenres = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWQ3MjVkZWFiZTE3NzVlZWRlMGZlNzlmODY2MmQxNiIsIm5iZiI6MTcyNzkzODQyNC44Mjg2ODUsInN1YiI6IjY2ZmUzYjM3MTU5MmVmMWJhOTg0Y2NhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ILRauoYs8ArRqkEwruYhVQGfkiBn600Gc9jY4h2Iz1k'
        }
      };
      try {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=ko', options);
        const data = await response.json();
        setGenres(data.genres); // 장르 데이터 상태에 저장
      }
      catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, [])

  const handleMovieClick = (movie) => {
    navigate(`/MovieDetail/${movie.id}`);
  };

  //페이지 로드시 다크모드 불러옴
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode)); // boolean으로 변환 후 상태 설정
    }
  }, [])

  //다크모드 값 변경시 재저장
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode])

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
            path="/MovieDetail/:movieId"
            element={
              <MovieDetail
                movies={movies}
                genres={genres}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
