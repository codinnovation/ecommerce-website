import React from "react";
import styles from "../../../styles/home/category.module.css";
import Image from "next/image";
import Photo2 from "../../../../public/sneaker.png";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Category() {
  return (
    <>
      <div className={styles.categoryContainer}>
        <div className={styles.categoryContent}>
          <div className={styles.header}>
            <h1>Bedroom Furniture</h1>

            <div className={styles.navigation}>
              <ArrowBackIcon className={styles.icon} />
              <ArrowForwardIcon className={styles.icon} />
            </div>
          </div>
          <div className={styles.productGrid}>
            <div className={styles.product}>
              <div className={styles.productImage}>
                <Image src={Photo2} width={900} height={900} alt="" />
              </div>

              <div className={styles.productName}>
                <h1>Modular Modern</h1>
              </div>

              <div className={styles.productPrice}>
                <h1>Ghc100.05</h1>
              </div>

              <div className={styles.actions}>
                <AddShoppingCartIcon className={styles.icon} />
                <FavoriteBorderIcon className={styles.icon} />
              </div>
            </div>

            <div className={styles.product}>
              <div className={styles.productImage}>
                <Image src={Photo2} width={900} height={900} alt="" />
              </div>

              <div className={styles.productName}>
                <h1>Modular Modern</h1>
              </div>

              <div className={styles.productPrice}>
                <h1>Ghc100.05</h1>
              </div>

              <div className={styles.actions}>
                <AddShoppingCartIcon className={styles.icon} />
                <FavoriteBorderIcon className={styles.icon} />
              </div>
            </div>

            <div className={styles.product}>
              <div className={styles.productImage}>
                <Image src={Photo2} width={900} height={900} alt="" />
              </div>

              <div className={styles.productName}>
                <h1>Modular Modern</h1>
              </div>

              <div className={styles.productPrice}>
                <h1>Ghc100.05</h1>
              </div>

              <div className={styles.actions}>
                <AddShoppingCartIcon className={styles.icon} />
                <FavoriteBorderIcon className={styles.icon} />
              </div>
            </div>

            <div className={styles.product}>
              <div className={styles.productImage}>
                <Image src={Photo2} width={900} height={900} alt="" />
              </div>

              <div className={styles.productName}>
                <h1>Modular Modern</h1>
              </div>

              <div className={styles.productPrice}>
                <h1>Ghc100.05</h1>
              </div>

              <div className={styles.actions}>
                <AddShoppingCartIcon className={styles.icon} />
                <FavoriteBorderIcon className={styles.icon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
