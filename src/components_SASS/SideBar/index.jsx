import React from "react";
import styles from "./Sidebar.module.scss";
import SidebarItem from "../SidebarItem";

import { Person, ShoppingCart, HowToReg } from "@material-ui/icons";
import CategoryIcon from "@mui/icons-material/Category";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLogin } from "../../features/login/loginSlice";

function Sidebar() {
  let location = useLocation();

  const userInfo = useSelector(selectLogin).info;
  const isLogin = useSelector(selectLogin).isLogin
  // sidebar data
  let sidebarItem = [
    {
      path: "/",
      name: "User",
      icon: "Person",
    },
    {
      path: "/category",
      name: "Category",
      icon: "CategoryIcon",
    },
    {
      path: "/products",
      name: "Product",
      icon: "PlaylistAddCheckCircleIcon",
    },
    {
      path: "/orders",
      name: "Orders",
      icon: "ShoppingCart",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.logo}>TShop</div>

      {isLogin && (
        <div className={styles.userInfo}>
          <div className={styles.imgWrapper}>
            <img src="/images/default-user-image.jpg" alt="user-ava" />
          </div>
          <span>{userInfo.name}</span>
        </div>
      )}

      <ul className={styles.SidebarList}>
        {sidebarItem.map((item, index) => {
          return (
            <SidebarItem
              isSelected={location.pathname === item.path ? true : false}
              key={index}
              icon={item.icon}
              name={item.name}
              path={item.path}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
