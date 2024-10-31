import React, { useState } from "react";
import styles from "../../../styles/home/navigation.module.css";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

function Navigation() {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  const getActiveClass = (path) => {
    return router.pathname === path ? styles.activeLink : "";
  };

  return (
    <>
      <div className={styles.navigationContainer}>
        <div className={styles.navigationContent}>
          <div
            className={styles.menuContainer}
            onClick={() => setOpenMenu(true)}
          >
            <MenuIcon className={styles.icon} />
            <h1>Categories</h1>
          </div>
          <div className={styles.linkContainer}>
            <Link href="/">Home</Link>
            <Link href="/">funiture</Link>
            <Link href="/">shop</Link>
            <Link href="/">mobile</Link>
            <Link href="/">offer</Link>
            <Link href="/">deal</Link>
            <Link href="/">blog</Link>
            <Link href="/">contact</Link>
            <Link href="/">menu</Link>
          </div>

          <div className={styles.actions}>
            <SearchIcon className={styles.icon} />

            <div className={styles.cartContainer}>
              <AddShoppingCartIcon className={styles.icon} />
              <p>3 items</p>
            </div>
          </div>
        </div>
      </div>

      {openMenu && (
        <>
          <div className={styles.menu}>
            <div
              className={styles.closeIcon}
              onClick={() => setOpenMenu(false)}
            >
              <CloseIcon className={styles.icon} />
            </div>

            <div className={styles.link}>
              <h1>1</h1>
              <h1>Living Room Furniture</h1>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navigation;
