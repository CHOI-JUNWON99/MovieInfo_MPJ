import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { supabase } from "./supabase";
import MovieCard from "./MovieCard";

const Container = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: white;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: center;
`;

const ProfileSection = styled.div`
  width: 100%;
  max-width: 360px;
  margin-bottom: 2rem;
  background: #f7f7f7;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid black;
`;

const FavoritesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
`;

function Favorite() {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState("/mypic.jpg");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    navigate("/");
  };

  return (
    <Container>
      <ProfileSection>
        <Section>
          <h2>My Favorite Movies</h2>
          <FavoritesList>
            {favoriteMovies.length > 0 ? (
              favoriteMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  poster={movie.poster_path}
                  onClick={() => console.log(`Navigate to movie ${movie.id}`)}
                />
              ))
            ) : (
              <p>즐겨찾기한 영화가 없습니다.</p>
            )}
          </FavoritesList>
        </Section>
      </ProfileSection>
    </Container>
  );
}

export default Favorite;
