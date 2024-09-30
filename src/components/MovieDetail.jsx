// src/components/MovieDetail.jsx
import React from 'react';
import styled from 'styled-components';

// styled-components 사용하여 스타일 정의
const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
`;

const Poster = styled.img`
  width: 300px;
  height: auto;
  border-radius: 10px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 600px;
`;

const TitleRating = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 2em;
`;

const Rating = styled.span`
  font-size: 1.5em;
  color: #ffa500;
`;

const Genre = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
`;

const Overview = styled.p`
  line-height: 1.6;
`;

const MovieDetail = ({ movie }) => {
    // movie가 undefined일 경우 로딩 처리 또는 빈 상태 처리
    if (!movie) {
        return <p>영화 정보를 불러오는 중입니다...</p>;
    }

    return (
        <Container>
            {/* 포스터 이미지 */}
            <Poster
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} 포스터`}
            />

            <InfoSection>
                {/* 제목과 평점 */}
                <TitleRating>
                    <Title>{movie.title}</Title>
                    <Rating>{movie.vote_average} / 10</Rating>
                </TitleRating>

                {/* 장르 */}
                <Genre>
                    {movie.genres && movie.genres.length > 0 ? (
                        movie.genres.map((genre, index) => (
                            <span key={index}>{genre.name} </span>
                        ))
                    ) : (
                        <span>장르 정보 없음</span>
                    )}
                </Genre>

                {/* 줄거리 */}
                <Overview>{movie.overview}</Overview>
            </InfoSection>
        </Container>
    );
};

export default MovieDetail;
