import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import GlobalState from "../GlobalState";
import { Person, ShoppingCart, HowToReg } from "@material-ui/icons";
import CategoryIcon from '@mui/icons-material/Category';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
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

// Comment
  let sidebarItem = [
    {
      path:'/',
      name:"User",
      component:"Person"
    },
    {
      path:'/category',
      name:"Category",
      component:"CategoryIcon"
    },
    {
      path:'/products',
      name:"Product",
      component:"PlaylistAddCheckCircleIcon"
    },
    {
      path:'/orders',
      name:"Orders",
      component:"ShoppingCart"
    },
    {
      path:'/login',
      name:"Login",
      component:"LoginIcon"
    },
    {
      path:'/register',
      name:"Register",
      component:"HowToReg"
    },
  ]

  if(isLogin){
    sidebarItem = sidebarItem.filter((item)=>item.path!=='/login')
  }

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
        
        {sidebarItem.map((item,index)=>(
          <Link key={index} to={item.path} style={{ textDecoration: "none", color: "black" }}>
            <SidebarItem
              isSelected={location.pathname === item.path ? true : false}
            >
              {item.component==='Person'&&<Person style={{ fontSize: 24 }} />}
              {item.component==='ShoppingCart'&&<ShoppingCart style={{ fontSize: 24 }} />}
              {item.component==='HowToReg'&&<HowToReg style={{ fontSize: 24 }} />}
              {item.component==='LoginIcon'&&<LoginIcon style={{ fontSize: 24 }} />}
              {item.component==='CategoryIcon'&&<CategoryIcon style={{ fontSize: 24 }} />}
              {item.component==='PlaylistAddCheckCircleIcon'&&<PlaylistAddCheckCircleIcon style={{ fontSize: 24 }} />}
              <span>{item.name}</span>
            </SidebarItem>
          </Link>
        ))}
        

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
