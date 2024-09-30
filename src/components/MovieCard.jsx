import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 위, 아래 요소 간의 공간 분배 */
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  width: 200px;
  text-align: center;
  cursor: pointer;
`;

const Poster = styled.img`
  max-width: 200px;
  height: 300px;
  border-radius: 8px;
`;

const Title = styled.h3`
  font-size: 1.2em;
  margin: 10px 0;
  flex-grow: 1;
`;

const Rating = styled.p`
  font-size: 0.9em;
  color: #888;
`;

const MovieCard = ({ title, poster, rating, onClick }) => {
    return (
        <Card onClick={onClick}>
            <Poster src={`https://image.tmdb.org/t/p/w500${poster}`} alt={`${title} 포스터`} />
            <Title>{title}</Title>
            <Rating>평점: {rating}</Rating>
        </Card>
    );
};

export default MovieCard;
