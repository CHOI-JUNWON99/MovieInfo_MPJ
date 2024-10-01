import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { CgProfile, CgDarkMode } from "react-icons/cg";

const StyledNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000000;
  width: 100%; 
  height: 70px;
  position: fixed; 
  top: 0; 
  left: 0; 
  z-index: 1000;
`;

const StyledLink = styled(Link)` //Link는 컴포넌트라 ()로 감싸줘야함
  text-decoration: none;

  h2 {
    color: red;
    margin-left: 30px;
  }
`;

const StyledNavbarButton = styled.button`
  display: flex;
  gap: 15px; 
  margin-right: 70px; 
  background-color: #000000;
  cursor: pointer;
  border: none;
`;

function Navbar({ setDarkMode }) {
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <StyledNavbar>
      <StyledLink to="/" onClick={handleScrollToTop}>
        <h2>NATFLIX</h2>
      </StyledLink>
      <StyledNavbarButton>
        <CgDarkMode style={{ width: '35px', height: '35px', color: '#f0f4f5' }} onClick={() => setDarkMode((prev) => !prev)} />
        <CiSearch style={{ width: '35px', height: '35px', color: '#f0f4f5' }} />
        <CgProfile style={{ width: '35px', height: '35px', color: '#f0f4f5' }} />
      </StyledNavbarButton>
    </StyledNavbar >
  );
}

export default Navbar;
