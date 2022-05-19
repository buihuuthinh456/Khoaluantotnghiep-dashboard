import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectLogin } from "../../features/login/loginSlice";
import styles from "./Header.module.scss";
import { Badge } from "@material-ui/core";
import Button from "@mui/material/Button";
import {
  Search,
  Notifications,
  Home,
  Person,
  Settings,
} from "@material-ui/icons";

import { useNavigate } from 'react-router-dom'

function Header() {

  const navigate = useNavigate()
  const loginState = useSelector(selectLogin);
  useEffect(() => {
    setUserInfo(loginState.info);
    setIsLogin((state) => (state = loginState.isLogin));
  }, [loginState.isLogin]);

  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const [userBox, setUserBox] = useState(false);

  const handleOpenUser = () => {
    if (userBox) {
      setUserBox(false);
    } else {
      setUserBox(true);
    }
  };

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
                <li className={styles.userControllerItem}>
                  <Home />
                  <span>Home</span>
                </li>
                <li className={styles.userControllerItem}>
                  <Person />
                  <span>User</span>
                </li>
                <li className={styles.userControllerItem}>
                  <Settings />
                  <span>Settings</span>
                </li>

                <div className={styles.logout}>
                  <button>Logout</button>
                </div>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.loginSection}>
          <Button style={{margin: 12}} variant="outlined" onClick={()=>navigate('/register')}>Register</Button>
          <Button variant="contained" onClick={()=>navigate('/login')}>Sign Up</Button>
        </div>
      )}
    </div>
  );
}

export default Header;
