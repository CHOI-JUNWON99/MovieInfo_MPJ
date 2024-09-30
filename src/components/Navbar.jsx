import React from 'react';
import styled from 'styled-components';
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

const StyledNavbar = styled.div`
  display: flex;
 
  text-align: center;
  align-items: center;
  position: relative;
  background-color: #000000;
  width: 100vw;
  height: 70px;
  gap: 1rem;

  button{
    background-color: #000000;
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
            <button><h2>NATFLEX</h2></button>
            <StyledNavbarButton>
                <CiSearch style={{ width: '35px', height: '35px', color: '#f0f4f5' }} />
                <CgProfile />
            </StyledNavbarButton>
        </StyledNavbar>
    );
}

export default Navbar;
