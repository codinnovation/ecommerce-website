import React, { useState } from "react";
import styles from "../../../styles/home/navigation.module.css";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Toaster, toast } from 'react-hot-toast';



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
            <Link href="/" className={getActiveClass("/")}>
              Home
            </Link>
            <Link href="/furniture" className={getActiveClass("/furniture")}>
              Furniture
            </Link>
            <Link href="/shop" className={getActiveClass("/shop")}>
              Shop
            </Link>
            <Link href="/mobile" className={getActiveClass("/mobile")}>
              Mobile
            </Link>
            <Link href="/offer" className={getActiveClass("/offer")}>
              Offer
            </Link>
            <Link href="/deal" className={getActiveClass("/deal")}>
              Deal
            </Link>
            <Link href="/blog" className={getActiveClass("/blog")}>
              Blog
            </Link>
            <Link href="/contact" className={getActiveClass("/contact")}>
              Contact
            </Link>
            <Link href="/menu" className={getActiveClass("/menu")}>
              Menu
            </Link>
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
      <Toaster/>

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
