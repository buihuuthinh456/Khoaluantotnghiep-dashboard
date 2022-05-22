import React, { useState } from "react";
import styles from "./NavbarMenuMobile.module.scss";
// MUI
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// Components
import SidebarItem from "../SidebarItem";
// redux

// router-dom
import { Link, useLocation } from "react-router-dom";

// others

// ==============================================
function NavbarMenuMobile() {
  const [openMenu, setOpenMenu] = useState(false);
  let location = useLocation();

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
      <div className={styles.menuIcon} onClick={()=> setOpenMenu(true)}>
        <MenuIcon sx={{ fontSize: 26 }} />
      </div>

      <div className={`${styles.burgerNav} ${openMenu ? styles.active : ""}`}>
        <div className={styles.overlay} onClick={()=> setOpenMenu(false)}></div>
        <div className={styles.burgerNavContent}>
          <div className={styles.closeBurgerNav} onClick={()=> setOpenMenu(false)}>
            <CloseIcon sx={{ fontSize: 26 }} />
          </div>

          <div className={styles.burgerNavBody}>
            <Link Link to="/" className={styles.logo}>
              TSHOP
            </Link>

            <ul className={styles.menuContainer}>
              {sidebarItem &&
                sidebarItem.map((item, index) => {
                  return (
                    <SidebarItem
                      key={index}
                      isSelected={
                        location.pathname === item.path ? true : false
                      }
                      icon={item.icon}
                      path={item.path}
                      name={item.name}
                      isCloseNav={()=>setOpenMenu(false)}
                    />
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarMenuMobile;
