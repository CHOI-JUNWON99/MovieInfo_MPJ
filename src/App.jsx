import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { debounce } from "lodash";
import { supabase } from "./components/supabase";

const StyledMovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const StyledTop = styled.h1`
  margin-top: 100px;
  color: ${({ $darkMode }) => ($darkMode ? "white" : "black")};
`;

const StyledOtherMovies = styled.h1`
  color: ${({ $darkMode }) => ($darkMode ? "white" : "black")};
`;

const StyledTopMovies = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const MoviesContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;
  width: 100%;
  padding: 10px;
  gap: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: ${({ $darkMode }) => ($darkMode ? "white" : "black")};
  z-index: 2;
  padding: 0 10px;

  &:hover {
    opacity: 0.8;
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 0;
`;

const RightArrow = styled(ArrowButton)`
  right: 0;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.darkMode ? "black" : "white")};
  }
  main {
    background-color: ${(props) => (props.darkMode ? "black" : "white")};
  }
`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [otherMovies, setOtherMovies] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [session, setSession] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const movieListRef = useRef(null);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchMovies = async (pageNum) => {
    setIsLoading(true);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWQ3MjVkZWFiZTE3NzVlZWRlMGZlNzlmODY2MmQxNiIsIm5iZiI6MTcyNzkzODQyNC44Mjg2ODUsInN1YiI6IjY2ZmUzYjM3MTU5MmVmMWJhOTg0Y2NhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ILRauoYs8ArRqkEwruYhVQGfkiBn600Gc9jY4h2Iz1k",
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${pageNum}`,
        options
      );
      const data = await response.json();

      if (pageNum === 1) {
        setTopMovies(data.results.slice(0, 20));
        if (data.results.length > 20) {
          setOtherMovies(data.results.slice(20));
        }
      } else {
        setOtherMovies((prevMovies) => [...prevMovies, ...data.results]);
      }
    } catch (error) {
      console.error("Error fetching Popular API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(1);
    fetchMovies(2);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.offsetHeight
    ) {
      if (!isLoading) {
        setPage((prevPage) => prevPage + 1);
        fetchMovies(page + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, page]);

  const handleSearch = debounce((searchQuery) => {
    if (searchQuery) {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, 500);

  const handleMovieClick = (movie) => {
    navigate(`/MovieDetail/${movie.id}`);
  };

  const scrollLeft = () => {
    movieListRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    movieListRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <>
      <GlobalStyle darkMode={darkMode} />
      <Navbar
        setDarkMode={setDarkMode}
        onSearch={handleSearch}
        session={session}
        setSession={setSession}
      />
      <main>
        {/* 경로가 /Login 또는 /Signup이 아닌 경우에만 Top 20을 렌더링 */}
        {location.pathname === "/" && (
          <>
            <StyledTop $darkMode={darkMode}>Top 20</StyledTop>
            <StyledTopMovies $darkMode={darkMode}>
              <LeftArrow $darkMode={darkMode} onClick={scrollLeft}>
                {"<"}
              </LeftArrow>
              <MoviesContainer ref={movieListRef}>
                {topMovies.map((movie, index) => (
                  <MovieCard
                    key={movie.id || index}
                    title={movie.title}
                    poster={movie.poster_path}
                    onClick={() => handleMovieClick(movie)}
                  />
                ))}
              </MoviesContainer>
              <RightArrow $darkMode={darkMode} onClick={scrollRight}>
                {">"}
              </RightArrow>
            </StyledTopMovies>
            <StyledOtherMovies $darkMode={darkMode}>
              Other Movies
            </StyledOtherMovies>
          </>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <StyledMovieList>
                {otherMovies.map((movie, index) => (
                  <MovieCard
                    key={movie.id || index}
                    title={movie.title}
                    poster={movie.poster_path}
                    onClick={() => handleMovieClick(movie)}
                  />
                ))}
              </StyledMovieList>
            }
          />
          <Route
            path="/MovieDetail/:movieId"
            element={
              <MovieDetail
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                session={session}
              />
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
