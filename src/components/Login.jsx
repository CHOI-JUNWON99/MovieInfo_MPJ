import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { supabase } from "./supabase";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  height: 100vh;

  @media (max-width: 1440px) {
    height: 90vh;
  }

  @media (max-width: 1024px) {
    height: 85vh;
  }

  @media (max-width: 768px) {
    height: 80vh;
  }

  @media (max-width: 425px) {
    height: 75vh;
  }

  @media (max-width: 375px) {
    height: 70vh;
  }

  @media (max-width: 320px) {
    height: 65vh;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 3px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 20px;
  margin: 10px;
  width: 400px; /* 기본 넓이 */
  height: auto; /* 자동 높이 */

  @media (max-width: 1440px) {
    width: 360px;
  }

  @media (max-width: 1024px) {
    width: 340px;
  }

  @media (max-width: 768px) {
    width: 320px;
  }

  @media (max-width: 425px) {
    width: 280px;
  }

  @media (max-width: 375px) {
    width: 260px;
  }

  @media (max-width: 320px) {
    width: 240px;
  }
`;

const Title = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  color: black;
  text-align: center;

  @media (max-width: 1440px) {
    font-size: 2.2rem;
  }

  @media (max-width: 1024px) {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 425px) {
    font-size: 1.5rem;
  }

  @media (max-width: 375px) {
    font-size: 1.4rem;
  }

  @media (max-width: 320px) {
    font-size: 1.2rem;
  }
`;

const Text = styled.div`
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: black;

  @media (max-width: 1440px) {
    font-size: 1.3rem;
  }

  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 425px) {
    font-size: 1rem;
  }

  @media (max-width: 375px) {
    font-size: 0.9rem;
  }

  @media (max-width: 320px) {
    font-size: 0.8rem;
  }
`;

const StyledInput = styled.input`
  background: #f7f7f7;
  border: none;
  border-radius: 5px;
  margin-bottom: 1rem;
  padding: 1rem;
  font-size: 1rem;

  @media (max-width: 1440px) {
    padding: 0.9rem;
    font-size: 0.95rem;
  }

  @media (max-width: 1024px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    padding: 0.7rem;
    font-size: 0.85rem;
  }

  @media (max-width: 425px) {
    padding: 0.6rem;
    font-size: 0.8rem;
  }

  @media (max-width: 375px) {
    padding: 0.55rem;
    font-size: 0.75rem;
  }

  @media (max-width: 320px) {
    padding: 0.5rem;
    font-size: 0.7rem;
  }
`;

const StyledFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledLoginButton = styled.button`
  background: black;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  width: 240px;
  height: 30px;

  @media (max-width: 1024px) {
    width: 220px;
  }

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 425px) {
    width: 180px;
  }

  @media (max-width: 375px) {
    width: 160px;
  }

  @media (max-width: 320px) {
    width: 150px;
  }
`;

const StyledKakaoLoginButton = styled.button`
  background: url("/kakao_logo.png") no-repeat center;
  background-size: 210px;
  border: none;
  border-radius: 20px !important;
  width: 250px;
  height: 60px;
  cursor: pointer;
  @media (max-width: 1024px) {
    width: 220px;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 40px;
  }

  @media (max-width: 425px) {
    width: 180px;
    height: 35px;
  }

  @media (max-width: 375px) {
    width: 160px;
    height: 30px;
  }

  @media (max-width: 320px) {
    width: 150px;
    height: 28px;
  }
`;

const StyledJoinButton = styled.button`
  background: #a8a6a6;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;

  @media (max-width: 1024px) {
    padding: 0.45rem;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    padding: 0.4rem;
    font-size: 0.9rem;
  }

  @media (max-width: 425px) {
    padding: 0.35rem;
    font-size: 0.85rem;
  }

  @media (max-width: 375px) {
    padding: 0.3rem;
    font-size: 0.8rem;
  }

  @media (max-width: 320px) {
    padding: 0.25rem;
    font-size: 0.75rem;
  }
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/");
    }
  };

  const handleKakaoLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        scopes: "profile_image profile_nickname  account_email",
      },
    });
    if (error) console.log("Error logging in with Kakao:", error.message);
  };

  return (
    <>
      <Container>
        <LoginForm onSubmit={handleLogin}>
          <Title>Login</Title>
          <Text>Email ID</Text>
          <StyledInput
            type="text"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
          <Text>Password</Text>
          <StyledInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <StyledFlex>
            <StyledLoginButton type="submit">Login</StyledLoginButton>
            <StyledKakaoLoginButton
              onClick={handleKakaoLogin}
            ></StyledKakaoLoginButton>
          </StyledFlex>
          <StyledJoinButton type="submit" onClick={() => navigate("/Signup")}>
            Signup
          </StyledJoinButton>
        </LoginForm>
      </Container>
    </>
  );
}

export default Login;
