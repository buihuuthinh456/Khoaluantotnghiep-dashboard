import React from "react";
import styles from "./SidebarItem.module.scss";
import { Person, ShoppingCart, HowToReg } from "@material-ui/icons";

function SidebarItem({isSelected}) {
  return (
    <li className={`${styles.container} ${isSelected ? `${styles.active}` : ''}`}>
      <div className={styles.icon}>
        <Person style={{ fontSize: 24 }}></Person>
      </div>
      <span>123456</span>
    </li>
  );
}

export default SidebarItem;
