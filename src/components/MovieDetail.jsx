import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CiStar } from "react-icons/ci";

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
    display: flex;
    position: absolute;
    width: 110px;
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

const FavoriteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-top: 5px;
  margin-left: 10px;

  svg {
    width: 30px;
    height: 30px;
    color: ${props => (props.isFavorite ? '#FFD700' : '#FFFFFF')};
    transition: color 0.3s ease;
  }

  &:hover svg {
    color: ${props => (props.isFavorite ? '#FFD700' : '#CCCCCC')}; 
  }
`;

//------------------------------------------------

const MovieDetail = ({ movies, darkMode, setDarkMode, session }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === parseInt(movieId));
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, [setDarkMode]);

  if (!movie) {
    return <p>영화 정보를 불러오는 중입니다...</p>;
  }

  // 장르 이름들을 콤마로 구분해서 문자열로 만듬 + movie.genres가 존재할 때만 .map 함수를 실행하게 만들어야함
  const genreNames = movie.genres?.map(genre => genre.name).join(', ') || '정보 없음';


  const handleFavoriteClick = () => {
    if (!session) {
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/Login');
    } else {
      setIsFavorite(!isFavorite);
      // 여기서 Supabase를 이용해 즐겨찾기 상태를 저장하는 로직 추가 가능
      console.log(`${movie.title} ${isFavorite ? '즐겨찾기에서 삭제' : '즐겨찾기에 추가'}`);
    }
  };

  return (
    <Container>
      <Backdrop $backdropPath={movie.backdrop_path} />

      <Poster
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} 포스터`}
      />

      < InfoSection >
        <TitleRating>
          <Title>{movie.title}</Title>
          <Rating>{movie.vote_average} / 10</Rating>
        </TitleRating>

        <Genre>{genreNames}</Genre>

        <div style={{ display: 'flex' }}>
          <p>Run Time: {movie.runtime} 분</p>
          <FavoriteButton onClick={handleFavoriteClick} isFavorite={isFavorite}>
            <CiStar />
          </FavoriteButton>
        </div>

        <Overview>{movie.overview}</Overview>
      </InfoSection >

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
    </Container >
  );
};

export default MovieDetail;