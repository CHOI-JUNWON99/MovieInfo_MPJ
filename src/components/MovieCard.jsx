import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //border: 1px solid #ddd;
  //background-color: #ffffff;
  color: #686666;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  width: 200px;
  text-align: center;
  cursor: pointer;

  :hover {
    transform: scale(1.1); // hover 시 크기 증가 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // 그림자 추가
  }
`;

const Poster = styled.img`
  max-width: 200px;
  height: 300px;
  border-radius: 8px;
`;

const Title = styled.h3`
  font-size: 1.1em;
  margin: 10px 0;
  flex-grow: 1;
`;

const MovieCard = ({ title, poster, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Poster src={`https://image.tmdb.org/t/p/w500${poster}`} alt={`${title} 포스터`} />
      <Title>{title}</Title>
    </Card>
  );
};

export default MovieCard;
