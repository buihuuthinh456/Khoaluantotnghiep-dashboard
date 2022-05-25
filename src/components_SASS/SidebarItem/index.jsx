import React from "react";
import styles from "./SidebarItem.module.scss";
import { Person, ShoppingCart, HowToReg } from "@material-ui/icons";
import CategoryIcon from "@mui/icons-material/Category";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import ImageIcon from '@mui/icons-material/Image';
import { Link } from "react-router-dom";

function SidebarItem({ isSelected, icon, path, name, isCloseNav=null }) {
  return (
    <Link to={path} style={{ textDecoration: "none", color: "black" }}>
      <li
        className={`${styles.container} ${isSelected ? `${styles.active}` : ""}`}
        onClick = {isCloseNav}
      >
        <div className={styles.icon}>
          {icon === "Person" && <Person style={{ fontSize: 24 }} />}
          {icon === "CategoryIcon" && (
            <CategoryIcon style={{ fontSize: 24 }} />
          )}
          {icon === "PlaylistAddCheckCircleIcon" && (
            <PlaylistAddCheckCircleIcon style={{ fontSize: 24 }} />
          )}
          {icon === "ShoppingCart" && (
            <ShoppingCart style={{ fontSize: 24 }} />
          )}
          {icon === "ImageIcon" && (
            <ImageIcon style={{ fontSize: 24 }} />
          )}
        </div>
        <span>{name}</span>
      </li>
    </Link>
  );
}

export default SidebarItem;
