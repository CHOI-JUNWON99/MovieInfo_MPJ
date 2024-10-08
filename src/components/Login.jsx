import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { supabase } from "./supabase";

const Container = styled.div`
  display: flex;
  margin-top: 150px;
  justify-content: center;
  justify-items: center;
  align-items: center;
  background: white;
  height: 100vw;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 3px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 10px;
  margin: 10px;
  width: 500px;
  height: 420px;
`;

const Title = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  color: black;
`;

const Text = styled.div`
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: black;
`;

const StyledInput = styled.input`
  background: #f7f7f7;
  border: none;
  border-radius: 5px;
  margin-bottom: 1rem;
  padding: 1rem;
  font-size: 1rem;
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
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledKakaoLoginButton = styled.button`
  background: url("../public/kakao_logo.png") no-repeat center;
  background-size: 240px;
  border: none;
  border-radius: 5px;
  width: 250px;
  height: 50px;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 10px;
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
