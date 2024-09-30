import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { CgProfile, CgDarkMode } from "react-icons/cg";

const StyledNavbar = styled.div`
  display: flex;
  justify-content: space-between; /* 좌우로 공간 분배 */
  align-items: center;
  background-color: #000000;
  width: 100%; 
  height: 70px;
  position: fixed; 
  top: 0; 
  left: 0; 
  z-index: 1000; /* 다른 요소보다 위에 표시 */
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  h2 {
    color: red;
    margin-left: 30px;
  }
`;

const StyledNavbarButton = styled.div`
  display: flex;
  gap: 15px; 
  margin-right: 70px; 
`;

function Navbar() {
    const handleScrollToTop = () => {
        window.scrollTo(0, 0);
    };
    return (
        <StyledNavbar>
            <StyledLink to="/" onClick={handleScrollToTop}>
                <h2>NATFLIX</h2>
            </StyledLink>
            <StyledNavbarButton>
                <CgDarkMode style={{ width: '35px', height: '35px', color: '#f0f4f5' }} />
                <CiSearch style={{ width: '35px', height: '35px', color: '#f0f4f5' }} />
                <CgProfile style={{ width: '35px', height: '35px', color: '#f0f4f5' }} />
            </StyledNavbarButton>
        </StyledNavbar >
    );
}

export default Navbar;
