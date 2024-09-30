import React from 'react';
import styled from 'styled-components';
import { CiSearch } from "react-icons/ci";

const StyledNavbar = styled.div`
  display: flex;
 
  text-align: center;
  align-items: center;
  position: relative;
  background-color: #000000;
  width: 100vw;
  height: 70px;
  gap: 1rem;

  h1{
    margin:50px;
    color: red;
  }
`;

const StyledNavbarButton = styled.button`
  display: flex;
  border: none;
  border-radius: 5px;
  width: 35px;
  height: 35px;
  background-color: #000000;
  cursor: pointer;

  .search_icon {
    width: 35px;
    height: 35px;
    color: #f0f4f5; 
  }
`;

function Navbar() {
    return (
        <StyledNavbar>
            <h1>NATFLEX</h1>
            <StyledNavbarButton>
                {/* 여기서 아이콘에 직접 스타일 적용 */}
                <CiSearch style={{ width: '35px', height: '35px', color: '#f0f4f5' }} />
            </StyledNavbarButton>
        </StyledNavbar>
    );
}

export default Navbar;
