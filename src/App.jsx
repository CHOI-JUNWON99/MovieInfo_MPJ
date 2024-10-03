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

  const navigate = useNavigate();

  useEffect(() => { // Popular API
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
        console.error('Error fetching Popular API:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => { // Details API
    const fetchMovieDetails = async (movieId) => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWQ3MjVkZWFiZTE3NzVlZWRlMGZlNzlmODY2MmQxNiIsIm5iZiI6MTcyNzkzODQyNC44Mjg2ODUsInN1YiI6IjY2ZmUzYjM3MTU5MmVmMWJhOTg0Y2NhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ILRauoYs8ArRqkEwruYhVQGfkiBn600Gc9jY4h2Iz1k'
        }
      };
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, options);
        const data = await response.json();
        return data; // 영화 세부 정보 반환
      } catch (error) {
        console.error('Error fetching Details API:', error);
      }
    };

    // 영화 목록을 순회하면서 각각의 상세 정보를 가져옵니다.
    const fetchAllDetails = async () => {
      const detailedMovies = await Promise.all(movies.map(async (movie) => {
        const details = await fetchMovieDetails(movie.id);
        return { ...movie, ...details }; // 영화의 상세 정보를 결합
      }));
      setMovies(detailedMovies); // 상세 정보를 결합한 영화 목록을 다시 설정
    };

    if (movies.length > 0) {
      fetchAllDetails();
    }
  }, [movies]);

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
