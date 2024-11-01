import React from "react";
import styles from "../../../styles/home/deal-of-the-day.module.css";
import Photo2 from "../../../../public/shirt.png";
import Image from "next/image";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Toaster, toast } from "react-hot-toast";

function DealOfTheDay() {
  function AddCart() {
    toast.success("Item added successfully");
  }
  return (
    <>
      <div className={styles.dealContainer}>
        <div className={styles.dealContent}>
          <div className={styles.header}>
            <h1>Deal of day</h1>
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
              <AddShoppingCartIcon className={styles.icon} onClick={AddCart} />
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
            <AddShoppingCartIcon className={styles.icon} onClick={AddCart} />
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
    </>
  );
}

export default DealOfTheDay;
