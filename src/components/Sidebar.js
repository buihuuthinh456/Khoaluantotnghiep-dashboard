import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import GlobalState from "../GlobalState";
import { Person, ShoppingCart, HowToReg } from "@material-ui/icons";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectLogin, logOut } from "../features/login/loginSlice";


function Sidebar() {
  let location = useLocation();
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const loginState = useSelector(selectLogin);


  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin((state) => (state = loginState.isLogin));
    setUserInfo(loginState.info);
  }, [loginState.isLogin]);

  return (
    <Container>
      <GlobalState />
      <Logo onClick={() => navigate("/")}>TShop</Logo>

      {isLogin && (
        <Wrapper>
          <UserInfo>
            <ImageWrap>
              <img src="/images/default-user-image.jpg" alt="user-ava"></img>
            </ImageWrap>
            <span>{userInfo.name}</span>
          </UserInfo>
        </Wrapper>
      )}

      <SidebarList>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <SidebarItem
            isSelected={location.pathname === "/" ? true : false}
          >
            <Person style={{ fontSize: 24 }} />
            <span>User</span>
          </SidebarItem>
        </Link>

        <Link to="/products" style={{ textDecoration: "none", color: "black" }}>
          <SidebarItem
            isSelected={location.pathname === "/products" ? true : false}
          >
            <ShoppingCart style={{ fontSize: 24 }} />
            <span>Product</span>
          </SidebarItem>
        </Link>

        {!isLogin && (
          <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
            <SidebarItem
              isSelected={location.pathname === "/login" ? true : false}
              isLogin={false}
            >
              <LoginIcon style={{ fontSize: 24 }}></LoginIcon>
              <span>Login</span>
            </SidebarItem>
          </Link>
        )}

        <Link to="/register" style={{ textDecoration: "none", color: "black" }}>
          <SidebarItem
            isSelected={location.pathname === "/register" ? true : false}
          >
            <HowToReg style={{ fontSize: 24 }} />
            <span>Register</span>
          </SidebarItem>
        </Link>

        {isLogin && (
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <SidebarItem
              onClick={() => {
                dispatch(logOut());
                navigate('/')
              }}
              isSelected={false}
              isLogin={true}
            >
              <LoginIcon>
                <img
                  src="images/outline_login_black_24dp.png"
                  alt="login"
                ></img>
              </LoginIcon>
              <span>Log Out</span>
            </SidebarItem>
          </Link>
        )}
      </SidebarList>
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100vh;
  z-index: 999;
  border-right: 1px solid #e1e5e9;
`;

const Logo = styled.div`
  font-size: 36px;
  font-weight: 600;
  color: var(--primary-color);
  cursor: pointer;
  padding: 20px;
  margin: 0;
`;

const Wrapper = styled.div`
  padding: 20px;
  height: 72px;
  margin-bottom: 36px;
`;

const UserInfo = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 16px 20px;
  background-color: #edeff2;
  border-radius: 10px;
  display: flex;
  align-items: center;

  span {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1.1;
    color: #353e49;
  }
`;

const ImageWrap = styled.div`
  height: 40px;
  border-radius: 50%;
  margin-right: 16px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SidebarList = styled.ul`
  margin-top: 60px;
  padding-left: 0;
  list-style: none;
`;

const SidebarItem = styled.li`
  cursor: pointer;
  padding: 20px;
  height: 50px;
  display: flex;
  align-items: center;
  margin: 12px 0;
  ${(state) =>
    state.isSelected
      ? `
        color: var(--primary-color);
        border-right: 4px solid var(--primary-color);
        background-color: #f1f2f5;   
    `
      : ""}

  &:hover {
    background-color: #f1f2f5;
  }

  span {
    margin-left: 16px;
    font-size: 14px;
    font-weight: 400;
    color: ${(state) => (state.isLogin ? "red" : "var(--text-color)")};
    text-decoration: none !important;
  }
`;
