import React from "react";
import Layout from "@/pages/layout";
import styles from "../../../styles/admin/orders.module.css";

function Orders() {
  return (
    <>
      <Layout />
      <div className={styles.orderContainer}>
        <div className={styles.orderContent}>
          <div className={styles.header}>
            <h1>Orders</h1>
          </div>

          <div className={styles.orderTable}>
            <div className={styles.orderTableHeader}>
              <h1>Header one</h1>
              <h1>Header one</h1>
              <h1>Header one</h1>
              <h1>Header one</h1>
            </div>

			<div className={styles.orderTableColumn}>
				<h1>Column</h1>
				<h1>Column</h1>
				<h1>Column</h1>
				<h1>Column</h1>
			</div>

			<div className={styles.orderTableColumn}>
				<h1>Column</h1>
				<h1>Column</h1>
				<h1>Column</h1>
				<h1>Column</h1>
			</div>	<div className={styles.orderTableColumn}>
				<h1>Column</h1>
				<h1>Column</h1>
				<h1>Column</h1>
				<h1>Column</h1>
			</div>

			<div className={styles.orderTableColumn}>
				<h1>Column</h1>
				<h1>Column</h1>
				<h1>Column</h1>
				<h1>Column</h1>
			</div>

			<div className={styles.orderTableColumn}>
				<h1>Column</h1>
				<h1>Column</h1>
				<h1>Column</h1>
				<h1>Column</h1>
			</div>

			<div className={styles.orderTableColumn}>
				<h1>Column</h1>
				<h1>Column</h1>
				<h1>Column</h1>
				<h1>Column</h1>
			</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
