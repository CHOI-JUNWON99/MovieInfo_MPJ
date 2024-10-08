import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { CiStar } from "react-icons/ci";
import { supabase } from "./supabase";

const Container = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
  padding: 20px;
  margin-top: 70px;
  color: #fff;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 1440px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50vh;
  background-image: ${(props) =>
    props.$backdropPath
      ? `url(https://image.tmdb.org/t/p/original${props.$backdropPath})`
      : "none"} !important;
  background-size: cover;
  background-position: center;
  filter: blur(10px);
  opacity: 0.9;
  z-index: 0.9;

  @media (max-width: 1440px) {
    width: 1440px;
    height: 90vh;
  }

  @media (max-width: 1024px) {
    width: 1024px;
    height: 90vh;
  }

  @media (max-width: 768px) {
    width: 768px;
    height: 85vh;
  }

  @media (max-width: 425px) {
    width: 425px;
    height: 80vh;
  }

  @media (max-width: 375px) {
    width: 375px;
    height: 75vh;
  }

  @media (max-width: 320px) {
    width: 320px;
    height: 70vh;
  }
`;

const Poster = styled.img`
  width: 300px;
  height: 45vh;
  border-radius: 10px;
  z-index: 1;

  @media (max-width: 1440px) {
    width: 280px;
    height: 300px;
  }

  @media (max-width: 1024px) {
    width: 250px;
    height: 280px;
  }

  @media (max-width: 768px) {
    width: 220px;
    height: 260px;
  }

  @media (max-width: 425px) {
    width: 180px;
    height: 240px;
  }

  @media (max-width: 375px) {
    width: 160px;
    height: 220px;
  }

  @media (max-width: 320px) {
    width: 140px;
    height: 200px;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 600px;
  z-index: 1;

  @media (min-width: 1441px) {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 600px;
    z-index: 1;
    margin-bottom: 10000px !important;
  }

  @media (max-width: 1440px) {
    align-items: center;
    text-align: center;
  }

  @media (max-width: 1024px) {
    align-items: center;
    text-align: center;
  }

  @media (max-width: 768px) {
    max-width: 90%;
  }

  @media (max-width: 425px) {
    max-width: 100%;
  }
`;

const TitleRating = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Title = styled.h2`
  font-size: 1.8em;

  @media (max-width: 1440px) {
    font-size: 1.6em;
  }

  @media (max-width: 1024px) {
    font-size: 1.4em;
  }

  @media (max-width: 768px) {
    font-size: 1.3em;
  }

  @media (max-width: 425px) {
    font-size: 1.2em;
  }

  @media (max-width: 375px) {
    font-size: 1.1em;
  }

  @media (max-width: 320px) {
    font-size: 1em;
  }
`;

const Rating = styled.span`
  font-size: 1.2em;
  color: #ffa500;

  @media (max-width: 1440px) {
    font-size: 1.1em;
  }

  @media (max-width: 1024px) {
    font-size: 1em;
  }

  @media (max-width: 768px) {
    font-size: 0.9em;
  }

  @media (max-width: 425px) {
    font-size: 0.8em;
  }

  @media (max-width: 375px) {
    font-size: 0.7em;
  }

  @media (max-width: 320px) {
    font-size: 0.6em;
  }
`;

const Genre = styled.div`
  background-color: #f3e7e7;
  padding: 10px;
  border-radius: 5px;
  color: #000;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }

  @media (max-width: 425px) {
    font-size: 0.8em;
  }

  @media (max-width: 375px) {
    font-size: 0.7em;
  }

  @media (max-width: 320px) {
    font-size: 0.6em;
  }
`;

const Overview = styled.p`
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.9em;
    text-align: center;
  }

  @media (max-width: 425px) {
    font-size: 0.8em;
  }

  @media (max-width: 375px) {
    font-size: 0.7em;
  }

  @media (max-width: 320px) {
    font-size: 0.6em;
  }
`;

const MovieSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;

  @media (max-width: 1024px) {
    align-items: center;
  }

  @media (max-width: 1440px) {
    flex-direction: column;
    justify-content: space-between;
    margin-top: 900px;
    position: absolute;
    left: 0;
  }

  @media (min-width: 1441px) {
    display: flex;
    flex-direction: column;
    margin-top: 520px;
    position: absolute;
    left: 0;
  }
`;

const Introduce = styled.p`
  font-size: 1.5em;
  color: #686666;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    font-size: 1.3em;
  }

  @media (max-width: 768px) {
    font-size: 1.2em;
  }

  @media (max-width: 425px) {
    font-size: 1.1em;
  }

  @media (max-width: 375px) {
    font-size: 1em;
  }

  @media (max-width: 320px) {
    font-size: 0.9em;
  }

  @media (min-width: 1025px) {
    margin-left: 0; /* 1025px 이상일 때는 Introduce를 원래대로 설정 */
  }
`;

const MoviesRecommand = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 10px;
  }
`;

const FavoriteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-top: 5px;
  margin-left: 10px;

  svg {
    width: 30px;
    height: 30px;
    color: ${(props) => (props.$isFavorite ? "#FFD700" : "#FFFFFF")};
    transition: color 0.3s ease;

    @media (max-width: 1440px) {
      width: 25px;
      height: 25px;
    }

    @media (max-width: 768px) {
      width: 20px;
      height: 20px;
    }

    @media (max-width: 425px) {
      width: 15px;
      height: 15px;
    }

    @media (max-width: 320px) {
      width: 12px;
      height: 12px;
    }
  }

  &:hover svg {
    color: ${(props) => (props.$isFavorite ? "#FFD700" : "#CCCCCC")};
  }
`;

//------------------------------------------------

const MovieDetail = ({ movies, darkMode, setDarkMode, session }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === parseInt(movieId));
  const [isFavorite, setIsFavorite] = useState(false);

  // 다크 모드 상태 로드
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, [setDarkMode]);

  // Hook 호출이 항상 일정한 순서대로 유지되도록 변경
  useEffect(() => {
    if (session && movieId) {
      checkIfFavorite();
    }
  }, [session, movieId]);

  const checkIfFavorite = async () => {
    if (session) {
      try {
        const { data, error } = await supabase
          .from("favorites")
          .select("*")
          .eq("users_id", session.user.id)
          .eq("movie_id", movieId);

        if (error) {
          console.error("Error fetching favorites:", error);
          return;
        }

        if (data.length > 0) {
          setIsFavorite(true);
        }
      } catch (err) {
        console.error("Error checking favorite status:", err);
      }
    }
  };

  const handleFavoriteClick = async () => {
    if (!session) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      navigate("/Login");
      return;
    }

    try {
      if (isFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("users_id", session.user.id)
          .eq("movie_id", movieId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert([{ users_id: session.user.id, movie_id: movieId }]);

        if (error) throw error;
      }

      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("Error handling favorite:", err);
    }
  };

  useEffect(() => {
    if (movieId) {
      const fetchMovieDetail = async () => {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWQ3MjVkZWFiZTE3NzVlZWRlMGZlNzlmODY2MmQxNiIsIm5iZiI6MTcyODM3NzA5Mi45NzY2NjEsInN1YiI6IjY2ZmUzYjM3MTU5MmVmMWJhOTg0Y2NhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wq2KkjK3GYthrpAZ35mcUilya0AEuX8M2wrBtH1bLKc",
          },
        };

        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            options
          );
          const data = await response.json();
          console.log(data);

          if (!response.ok) {
            throw new Error("Failed to fetch movie details");
          }
        } catch (error) {
          console.error("Error fetching Movie Details API:", error);
        }
      };

      fetchMovieDetail();
    }
  }, [movieId]);

  // Hook들 위로 movie 확인 로직을 이동
  if (!movie) {
    return <p>영화 정보를 불러오는 중입니다...</p>;
  }

  return (
    <Container>
      <Backdrop $backdropPath={movie.backdrop_path} />
      <Poster
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} 포스터`}
      />
      <InfoSection>
        <TitleRating>
          <Title>{movie.title}</Title>
          <Rating>{movie.vote_average} / 10</Rating>
        </TitleRating>
        <Genre>
          {movie.genres?.map((genre) => genre.name).join(", ") || "정보 없음"}
        </Genre>
        <div style={{ display: "flex" }}>
          <p>Run Time: {movie.runtime} 분</p>
          <FavoriteButton
            onClick={handleFavoriteClick}
            $isFavorite={isFavorite}
          >
            <CiStar />
          </FavoriteButton>
        </div>
        <Overview>{movie.overview}</Overview>
      </InfoSection>
      <MovieSection>
        <Introduce>다른 영화</Introduce>
        <MoviesRecommand>
          {movies.slice(0, 18).map((similarMovie) => (
            <MovieCard
              onClick={() => navigate(`/MovieDetail/${similarMovie.id}`)}
              key={similarMovie.id}
              title={similarMovie.title}
              poster={similarMovie.poster_path}
              rating={similarMovie.vote_average}
            />
          ))}
        </MoviesRecommand>
      </MovieSection>
    </Container>
  );
};

export default MovieDetail;
