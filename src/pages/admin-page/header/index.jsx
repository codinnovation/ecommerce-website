import React from "react";
import styles from "../../../styles/admin/header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (category) {
      router.push(`/admin-page/list?category=${category}&title=${category}`);
      console.log(category)
    }
  };

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <div className={styles.storeName}>
            <h1>Admin</h1>
          </div>

          <div className={styles.headerInfomation}>
            <Link href="/admin-page/">Home</Link>
            <Link href="/admin-page/orders">Orders</Link>

            <div className={styles.category}>
              <select onChange={handleCategoryChange}>
                <option value="">Select</option>
                <option value="fashion">Fashion</option>
                <option value="homeAppliances">Home Appliances</option>
                <option value="shoes">Shoes</option>
                <option value="sneakers">Sneakers</option>
                <option value="electronics">Electronics</option>
                <option value="laptops">Laptops</option>
                <option value="applePhones">Apple Phones</option>
                <option value="androidPhone">Android Phones</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
