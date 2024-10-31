import React from "react";
import styles from "../../../styles/home/header.module.css";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

function Header() {
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <div className={styles.storeName}>
            <h1>SIMEN</h1>
          </div>

          <div className={styles.headerInfomation}>
            <div className={styles.info}>
              <DeliveryDiningIcon className={styles.icon} />
              <div className={styles.name}>
                <h1>Free Delivery Worldwide</h1>
                <p>On order over ghc100</p>
              </div>
            </div>

			<div className={styles.info}>
              <CardGiftcardIcon className={styles.icon} />
              <div className={styles.name}>
                <h1>Buy 1 get 1 free</h1>
                <p>On order over ghc100</p>
              </div>
            </div>

			<div className={styles.info}>
              <DeliveryDiningIcon className={styles.icon} />
              <div className={styles.name}>
                <h1>Free Delivery Worldwide</h1>
                <p>On order over ghc100</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
