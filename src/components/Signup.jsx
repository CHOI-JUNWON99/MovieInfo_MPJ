import { supabase } from "./supabase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin-top: 100px;
  justify-content: center;
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
  height: 500px;
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

const StyledJoinButton = styled.button`
  background: #020202;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
`;

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다!");
      return;
    }

    //나머지 이름 같은 데이터는 supabase.auth.update 를 이용해서 추후 업데이트!
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/Login");
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSignup}>
        <Title>Signup</Title>

        {error && <p>{error}</p>}

        <Text>Email</Text>
        <StyledInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Text>Password</Text>
        <StyledInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Text>Confirm Password </Text>
        <StyledInput
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <StyledJoinButton type="submit">Signup</StyledJoinButton>
      </LoginForm>
    </Container>
  );
}

export default Signup;
