import React, { useEffect } from 'react';
import styled from 'styled-components';
import MovieCard from './MovieCard';
import { useNavigate, useParams } from 'react-router-dom'; // useParams로 URL 파라미터 사용

const Container = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
  padding: 20px;
  margin-top: 70px; 
  color: #fff;
`;

// 배경 이미지 (blur 처리)
const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${props => `https://image.tmdb.org/t/p/original${props.$backdropPath}`}) !important;
  background-size: cover;
  background-position: center;
  filter: blur(10px); //10px정도의 흐림효과 적용
  opacity: 0.9; //50프로로 불투명도 조절
  z-index: 0.9;
`;

const Poster = styled.img`
  width: 300px;
  height: auto;
  border-radius: 10px;
  z-index: 1;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 600px;
  z-index: 1;
`;

const TitleRating = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 1.2em;
`;

const Rating = styled.span`
  font-size: 0.9em;
  color: #ffa500;
`;

const Genre = styled.div`
  background-color: #f3e7e7;
  padding: 10px;
  border-radius: 5px;
  color: #000; 
`;

const Overview = styled.p`
  line-height: 1.6;
`;

const MovieSection = styled.div`
  display: flex;
  position: absolute;
  color: black;
  margin-top: 500px;
`;

const Introduce = styled.p`
    //border: none;
    //border-radius: 5px;
    //background-color: #f1f1f1;
    display: flex;
    position: absolute;
    width: 110px;
    //height: 40px;
    //justify-content: center;
    //text-align: center;
    //justify-items: center;
    margin-left: 10px;
    color: #686666;
    font-size: 1.5em;
`;

const MoviesRecommand = styled.div`
  margin-top: 60px;
  display: flex;
  flex-wrap: wrap; 
  color:black;
  justify-content: space-around;
`;

const MovieDetail = ({ movies, setDarkMode }) => {
  // movie가 undefined일 경우 로딩 처리 또는 빈 상태 처리
  const { movieId } = useParams();
  const movie = movies.find(m => m.id === parseInt(movieId));
  const navigate = useNavigate();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, [setDarkMode]);

  if (!movie) {
    return <p>영화 정보를 불러오는 중입니다...</p>;
  }

  const genreNames = movie.genres.map(genre => genre.name).join(', ');

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

        <Genre>{genreNames}</Genre>
        <p>상영시간: {movie.runtime}분</p>

        <Overview>{movie.overview}</Overview>
      </InfoSection>

      <MovieSection>
        <Introduce>다른 영화</Introduce>
        <MoviesRecommand>
          {movies && movies.length > 0 ? (
            movies.slice(0, 18).map((similarMovie) => (
              <MovieCard
                onClick={() => navigate(`/MovieDetail/${similarMovie.id}`)}
                key={similarMovie.id}
                title={similarMovie.title}
                poster={similarMovie.poster_path}
                rating={similarMovie.vote_average}
              />
            ))
          ) : (
            <p>비슷한 영화 정보가 없습니다</p>
          )}
        </MoviesRecommand>
      </MovieSection>
    </Container>
  );
};

export default MovieDetail;
