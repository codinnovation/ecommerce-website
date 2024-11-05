import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/home/topbar.module.css";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyIcon from "@mui/icons-material/Key";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";

function Topbar({ user }) {
  const router = useRouter();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleLoginOrLogout = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setIsButtonClicked(true);
      try {
        const response = await fetch("/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          toast.success("Logout Successful");
          router.push("/login");
        } else {
          toast.error("Logout Failed");
        }
      } catch (error) {
        toast.error("Error Occurred");
      } finally {
        setIsButtonClicked(false);
      }
    }
  };

  return (
    <>
      <Toaster position="top-right" />
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
              <h1>My Wishlist</h1>
            </div>

            <div className={styles.profile}>
              <ShoppingCartCheckoutIcon className={styles.icon} />
              <h1>Checkout</h1>
            </div>

            <div
              className={styles.profile}
              onClick={handleLoginOrLogout}
            >
              <KeyIcon className={styles.icon} />
              <h1>{user ? "Logout" : "Login"}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;
