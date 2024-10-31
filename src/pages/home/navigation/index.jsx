import React from "react";
import styles from "../../../styles/home/navigation.module.css";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";

function Navigation() {
  const router = useRouter();

  const getActiveClass = (path) => {
    return router.pathname === path ? styles.activeLink : "";
  };

  return (
    <>
      <div className={styles.navigationContainer}>
        <div className={styles.navigationContent}>
          <div className={styles.menuContainer}>
            <MenuIcon className={styles.icon} />
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
    </>
  );
}

export default Navigation;
