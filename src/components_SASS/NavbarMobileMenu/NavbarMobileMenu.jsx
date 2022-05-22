import React, { useEffect, useState } from "react";
import styles from "./navbarMobileMenu.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCategory,
  getCategoriesAsync,
} from "../../features/category/categorySlice";
function NavbarMobileMenu() {
  const dispatch = useDispatch();
  const categoryState = useSelector(selectCategory);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, []);

  const data = categoryState.categories;

  if (categoryState.isLoading)
    return (
      <div className={styles.loading}>
        <Loading></Loading>
      </div>
    );
  return (
    <div className={styles.container}>
      <div className={styles.menuIcon} onClick={() => setOpenMenu(true)}>
        <MenuIcon />
      </div>

      <div className={`${styles.burgerNav} ${openMenu ? styles.active : ""}`}>
        <div
          className={styles.closeBurgerNav}
          onClick={() => setOpenMenu(false)}
        >
          <div className={styles.closeIcon}>
            <CloseIcon style={{ fontSize: "2.5rem" }}></CloseIcon>
          </div>
        </div>
        <Link Link to="/" className={styles.logo}>
          TSHOP
        </Link>
        <ul className={styles.menuContainer}>
          <li className={styles.menuItem}>
            <Link to="/" className={styles.menuItemLink}>
              Home
            </Link>
          </li>
          {data &&
            data.map((item, index) => (
              <li key={item._id} className={styles.menuItem}>
                <Link to={`/category/${item.name}`} className={styles.menuItemLink}>
                  {item.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default NavbarMobileMenu;
