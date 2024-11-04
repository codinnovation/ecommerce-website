import React from "react";
import Layout from "../layout";
import styles from "../../styles/payment.module.css";
import Image from "next/image";
import CyberTruck from "../../../public/cybertruck.png";

function Payment() {
  return (
    <>
      <Layout />
      <div className={styles.paymentContainer}>
        <div className={styles.paymentContent}>
          <div className={styles.header}>
            <p>Payment</p>
          </div>

          <div className={styles.productGrid}>
            <div className={styles.productImage}>
              <Image src={CyberTruck} width={900} height={900} alt="" />
            </div>

            <div className={styles.description}>
              <div className={styles.header}>
                <h1>Modular Modern</h1>
              </div>

              <div className={styles.price}>
                <p>Ghc</p>
                <p>505.90</p>
              </div>

              <hr />

              <div className={styles.form}>
                <h1>Fill in the spaces</h1>

                <div className={styles.inputFields}>
                  <div className={styles.field}>
                    <label>First Name</label>
                    <input />
                  </div>

                  <div className={styles.field}>
                    <label>Last Name</label>
                    <input />
                  </div>

                  <div className={styles.field}>
                    <label>Email</label>
                    <input />
                  </div>

                  <div className={styles.field}>
                    <label>Phone</label>
                    <input />
                  </div>
                </div>
              </div>

              <div className={styles.actionBtn}>
				<button>Proceed</button>
			  </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
