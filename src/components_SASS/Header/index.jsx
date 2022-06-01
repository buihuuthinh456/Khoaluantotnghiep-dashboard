import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.scss";

// redux
import { useSelector, useDispatch } from "react-redux";
import { selectLogin, logOut } from "../../features/login/loginSlice";

// MUI
import { Badge } from "@material-ui/core";
import Button from "@mui/material/Button";
import {
  Search,
  Notifications,
  Home,
  Person,
  Settings,
} from "@material-ui/icons";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

// Components
import NavbarMenuMobile from "../NavbarMenuMobile";
import ChangePassword from "../ChangePassword"
// Others
import { useNavigate } from 'react-router-dom'


function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loginState = useSelector(selectLogin);
  useEffect(() => {
    setUserInfo(loginState.info);
    setIsLogin((state) => (state = loginState.isLogin));
  }, [loginState.isLogin]);

  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [openChangePassword, setOpenChangePassword] = useState(false)
  const [userBox, setUserBox] = useState(false);

  const handleOpenUser = () => {
    if (userBox) {
      setUserBox(false);
    } else {
      setUserBox(true);
    }
  };

  const handleLogout = (e) => {
    e.stopPropagation()
    dispatch(logOut())
  }

  // close user
  const userRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (!userRef.current.contains(e.target)) {
        setUserBox(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => {
      window.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className={styles.container}>
      <div className={styles.navbarMenuMobile}>
        <NavbarMenuMobile />
      </div>
      {isLogin ? (
        <div ref={userRef} className={styles.userIcon} onClick={handleOpenUser}>
          <img src="/images/default-user-image.jpg" alt="user-ava"></img>
          {userBox && (
            <div
              className={styles.userMenu}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.userInfo}>
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
              </div>

              <ul className={styles.userController}>
                <li className={styles.userControllerItem} onClick={()=>navigate("/")}>
                  <Home />
                  <span>Trang chủ</span>
                </li>
                <li className={styles.userControllerItem} onClick={()=>navigate(`/profile/${userInfo._id}`)}>
                  <Person />
                  <span>Người dùng</span>
                </li>
                <li className={styles.userControllerItem} onClick={()=>setOpenChangePassword(true)}>
                  <SettingsApplicationsIcon />
                  <span>Đổi mật khẩu</span>
                </li>

                <div className={styles.logout}>
                  <button onClick={(e)=>handleLogout(e)}>Đăng xuất</button>
                </div>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.loginSection}>
          <Button style={{margin: 12}} variant="outlined" onClick={()=>navigate('/register')}>Register</Button>
          <Button variant="contained" onClick={()=>navigate('/login')}>Login</Button>
        </div>
      )}

      {openChangePassword && <ChangePassword
        onClose = {()=>setOpenChangePassword(false)}
      ></ChangePassword>}
    </div>
  );
}

export default Header;
