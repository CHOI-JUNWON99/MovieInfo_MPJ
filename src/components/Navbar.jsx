import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CgProfile, CgDarkMode } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import { supabase } from "./supabase"; // supabase 추가

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
  background-color: #000000;
  cursor: pointer;
  border: none;
`;

const SearchContainer = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
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

const DropdownMenu = styled.div`
  width: 100px;
  position: absolute;
  top: 40px;
  left: -40px;
  background-color: #000000;
  padding: 10px;
  border-radius: 5px;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  z-index: 999;
`;

const DropdownItem = styled.div`
  color: white;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const ProfileContainer = styled.div`
  position: relative;
`;

function Navbar({ setDarkMode, onSearch, session, setSession }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery("");
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    navigate("/");
  };

  const handleProfileClick = () => {
    if (!session) {
      navigate("/Login"); // 로그인되지 않은 경우 로그인 화면으로 이동
      setIsDropdownOpen(false);
    }
  };

  const handleMouseEnter = () => {
    if (session) {
      setIsDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      <StyledNavbar>
        <StyledLink to="/" onClick={() => window.scrollTo(0, 0)}>
          <h2>NATFLIX</h2>
        </StyledLink>

        <StyledNavbarButton>
          <CgDarkMode
            style={{ width: "35px", height: "35px", color: "#f0f4f5" }}
            onClick={() => setDarkMode((prev) => !prev)}
          />

          {isSearchOpen ? (
            <AiOutlineClose
              style={{ width: "35px", height: "35px", color: "#f0f4f5" }}
              onClick={handleSearch}
            />
          ) : (
            <CiSearch
              style={{ width: "35px", height: "35px", color: "#f0f4f5" }}
              onClick={handleSearch}
            />
          )}

          <ProfileContainer
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleProfileClick}
          >
            <CgProfile
              style={{ width: "35px", height: "35px", color: "#f0f4f5" }}
            />
            {/* 로그인된 경우에만 드롭다운 메뉴 표시 */}
            {session && (
              <DropdownMenu $isOpen={isDropdownOpen}>
                <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
              </DropdownMenu>
            )}
          </ProfileContainer>
        </StyledNavbarButton>
      </StyledNavbar>

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
