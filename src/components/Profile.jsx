import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

const SectionHeader = styled.div`
    text-align: center;
    font-size: 1.5rem;
    color: black;
    margin-bottom: 1rem;
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
const Button = styled.button`
    width: 50%;
    background: black;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.75rem;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 1rem;

    :hover{
        background: #333;
    }
`;

const Element = styled.div`
    border-bottom: 1px solid black;
    margin-top: 20px;
    margin-bottom: 10px;
`;
const LabelProfilePictureContainer = styled.label`
    cursor: pointer; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    width: 100%; 
`;
const ImgProfilePicture = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%; /* 원형 이미지 */
    border: 5px solid black;
    object-fit: cover; /* 이미지 비율 유지 */
`;



function Profile() {

    const navigate = useNavigate();

    const [profileImg, setProfileImg] = useState('/mypic.jpg');

    return (
        <Container>
            <ProfileSection>
                <SectionHeader>Profile</SectionHeader>
                <LabelProfilePictureContainer>
                    <ImgProfilePicture src={profileImg} alt="Profile" />
                </LabelProfilePictureContainer>

                <Element></Element>

                <Section>
                    <SectionHeader>Account</SectionHeader>
                    <Button>Edit Profile</Button>
                    <Button>Change Password</Button>
                </Section>

                <Element></Element>

                <Section>
                    <SectionHeader>Information</SectionHeader>
                    <Button>My Favorite Moive</Button>
                    <Button>Delete Account</Button>
                    <Button>Logout</Button>
                </Section>
            </ProfileSection>
        </Container>
    );
}

export default Profile;
