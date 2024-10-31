import React from "react";
import styles from "../../../styles/home/topbar.module.css";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyIcon from "@mui/icons-material/Key";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

function Topbar() {
  return (
    <>
      <div className={styles.topbarContainer}>
        <div className={styles.topbarContent}>
          <div className={styles.langContainer}>
            <LanguageIcon className={styles.icon} />
            <h1>English</h1>
            <ArrowDropDownIcon className={styles.icon1} />
          </div>

          <div className={styles.profileContainer}>
            <div className={styles.profile}>
              <PersonIcon className={styles.icon} />
              <h1>My Account</h1>
            </div>

            <div className={styles.profile}>
              <FavoriteBorderIcon className={styles.icon} />
              <h1>My Whishlist</h1>
            </div>

            <div className={styles.profile}>
              <ShoppingCartCheckoutIcon className={styles.icon} />
              <h1>Checkout</h1>
            </div>

            <div className={styles.profile}>
              <KeyIcon className={styles.icon} />
              <h1>Login</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;
