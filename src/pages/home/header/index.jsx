import React from "react";
import styles from "../../../styles/home/header.module.css";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import CallIcon from '@mui/icons-material/Call';
import PriceChangeIcon from '@mui/icons-material/PriceChange';

function Header() {
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <div className={styles.storeName}>
            <h1>Darlington&apos;s </h1>
            <h1>Mall</h1>
          </div>

          <div className={styles.headerInfomation}>
            <div className={styles.info}>
              <DeliveryDiningIcon className={styles.icon} />
              <div className={styles.name}>
                <h1>Delivery Nationwide</h1>
                <p>Order now!</p>
              </div>
            </div>

            <div className={styles.info}>
              <PriceChangeIcon className={styles.icon} />
              <div className={styles.name}>
                <h1>Affordable Prices</h1>
                <p>Darlington&apos;s Mall</p>
              </div>
            </div>

            <div className={styles.info}>
              <CallIcon className={styles.icon} />
              <div className={styles.name}>
                <h1>+233 552 945 333</h1>
                <p>asomanirawlingsjunior71@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
