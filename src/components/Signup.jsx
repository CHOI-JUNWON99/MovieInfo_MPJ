import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    margin-top: 100px;
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
    height: 620px;
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

    return (
        <>
            <Container>
                <LoginForm>
                    <Title>Signup</Title>
                    <Text>User name</Text>
                    <StyledInput type="text" placeholder="name" /*value={id}*/></StyledInput>
                    <Text>Email</Text>
                    <StyledInput type="email" placeholder="Email" /*value={id}*/></StyledInput>
                    <Text>Password</Text>
                    <StyledInput type="password" placeholder="Password" /*value={pw}*/></StyledInput>
                    <Text>Confirm Password </Text>
                    <StyledInput type="password" placeholder="Password" /*value={pw}*/></StyledInput>
                    <StyledJoinButton type="submit">Signup</StyledJoinButton>
                </LoginForm>
            </Container>
        </>
    );
}

export default Signup;
