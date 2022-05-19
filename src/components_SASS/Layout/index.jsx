import React from "react";
import Header from "../Header";
import Sidebar from "../SideBar";
import styles from "./defaultLayout.module.scss";

function Layout({children}) {
  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>
          <Sidebar />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
            <Header />
        </div>
        <div className={styles.router}>
            {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
