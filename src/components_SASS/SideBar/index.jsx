import React from "react";
import styles from "./Sidebar.module.scss";
import SidebarItem from "../SidebarItem";
import { Person, ShoppingCart, HowToReg } from "@material-ui/icons";

function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>TShop</div>

      <div className={styles.userInfo}>
        <div className={styles.imgWrapper}>
          <img src="/images/default-user-image.jpg" alt="user-ava" />
        </div>

        <span>123456</span>
      </div>

      <ul className={styles.SidebarList}>
        <SidebarItem isSelected={true} />
        <SidebarItem isSelected={false} />
      </ul>
    </div>
  );
}

export default Sidebar;
