import { supabase } from "./supabase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  height: 100vh; /* 화면 크기에 맞게 높이 설정 */
  padding: 20px;

  @media (max-width: 1440px) {
    padding: 15px;
  }

  @media (max-width: 1024px) {
    padding: 10px;
  }

  @media (max-width: 768px) {
    padding: 5px;
  }

  @media (max-width: 425px) {
    padding: 2px;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 3px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 20px;
  width: 500px;
  height: auto;

  @media (max-width: 1440px) {
    width: 450px;
  }

  @media (max-width: 1024px) {
    width: 400px;
  }

  @media (max-width: 768px) {
    width: 350px;
  }

  @media (max-width: 425px) {
    width: 300px;
  }

  @media (max-width: 375px) {
    width: 280px;
  }

  @media (max-width: 320px) {
    width: 250px;
  }
`;

const Title = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  color: black;
  text-align: center;

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
    font-size: 1.3rem;
  }

  @media (max-width: 320px) {
    font-size: 1.1rem;
  }
`;

const Text = styled.div`
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: black;

  @media (max-width: 1024px) {
    font-size: 1.3rem;
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

  @media (max-width: 1024px) {
    padding: 0.9rem;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }

  @media (max-width: 425px) {
    padding: 0.7rem;
    font-size: 0.85rem;
  }

  @media (max-width: 375px) {
    padding: 0.6rem;
    font-size: 0.8rem;
  }

  @media (max-width: 320px) {
    padding: 0.5rem;
    font-size: 0.75rem;
  }
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

  @media (max-width: 1024px) {
    padding: 0.9rem;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }

  @media (max-width: 425px) {
    padding: 0.7rem;
    font-size: 0.85rem;
  }

  @media (max-width: 375px) {
    padding: 0.6rem;
    font-size: 0.8rem;
  }

  @media (max-width: 320px) {
    padding: 0.5rem;
    font-size: 0.75rem;
  }
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
