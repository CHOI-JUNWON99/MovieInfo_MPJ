import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { CgProfile, CgDarkMode } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";

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

const StyledNavbarButton = styled.div`
  display: flex;
  gap: 15px; 
  margin-right: 70px; 
  background-color: #000000;
  cursor: pointer;
  border: none;
`;

const SearchContainer = styled.div`
  position: fixed;
  top: 70px;
  left: 0; 
  width: 100%;
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  align-items: center;
  background-color: #111;
  padding: 0 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  margin-right: 40px;
  padding: 10px;
  border: none;
  background-color: #222;
  color: #f0f4f5;
  outline: none;
  border-radius: 5px;
`;


function Navbar({ setDarkMode, onSearch }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery('');
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const navigate = useNavigate();

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <StyledNavbar>
        <StyledLink to="/" onClick={handleScrollToTop}>
          <h2>NATFLIX</h2>
        </StyledLink>
        <StyledNavbarButton>
          <button>해당 버튼은 과제진행을 위한 임시버튼입니다.</button>
          <button onClick={() => navigate('/Login')}>Login</button>
          <button onClick={() => navigate('/Signup')}>Signup</button>
          <button onClick={() => navigate('/Profile')}>Profile</button>
        </StyledNavbarButton>
        <StyledNavbarButton>
          <CgDarkMode style={{ width: '35px', height: '35px', color: '#f0f4f5' }} onClick={() => setDarkMode(prev => !prev)} />

          {isSearchOpen ? (
            <AiOutlineClose style={{ width: '35px', height: '35px', color: '#f0f4f5' }} onClick={handleSearch} />
          ) : (
            <CiSearch style={{ width: '35px', height: '35px', color: '#f0f4f5' }} onClick={handleSearch} />
          )}

          <CgProfile style={{ width: '35px', height: '35px', color: '#f0f4f5' }} />
        </StyledNavbarButton>
      </StyledNavbar >

      <SearchContainer $isOpen={isSearchOpen}>
        <SearchInput
          type="text"
          placeholder="영화를 찾아보세요.."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </SearchContainer>
    </>
  );
}

export default Navbar;