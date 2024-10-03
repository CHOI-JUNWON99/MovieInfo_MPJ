import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    margin-top: 150px;
    justify-content: center;
    justify-items: center;
    align-items: center;
    background: white;
`;

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    border: 3px solid #ddd;
    border-radius: 8px;
    background-color: #ffffff;
    padding: 10px;
    margin: 10px;
    width: 500px;
    height: 470px;
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

const StyledLoginButton = styled.button`
    background: black; 
    color: white; 
    border: none;
    border-radius: 5px;
    padding: 1rem;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1rem;
`;

const StyledJoinButton = styled.button`
    background: #525151; 
    color: white;
    border: none;
    border-radius: 5px;
    padding: 1rem;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1rem;
`;

function Login() {

    const navigate = useNavigate();

    return (
        <>
            <Container>
                <LoginForm>
                    <Title>Login</Title>
                    <Text>Email ID</Text>
                    <StyledInput type="text" placeholder="Email address" /*value={id}*/></StyledInput>
                    <Text>Password</Text>
                    <StyledInput type="password" placeholder="Password" /*value={pw}*/></StyledInput>
                    <StyledLoginButton type="submit">Login</StyledLoginButton>
                    <StyledJoinButton type="submit" onClick={() => navigate('/Signup')} >Signup</StyledJoinButton>
                </LoginForm>
            </Container>
        </>
    );
}

export default Login;
