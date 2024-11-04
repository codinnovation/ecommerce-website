import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../layout";
import styles from "../../styles/product-detailed.module.css";
import Image from "next/image";
import CyberTruck from "../../../public/cybertruck.png";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PaymentIcon from "@mui/icons-material/Payment";
import { Toaster, toast } from "react-hot-toast";

function ProductDetail() {
  const router = useRouter();
  const { productName, productPrice, productImage, productDescription } =
    router.query;

  function AddCart() {
    toast.success("Item added successfully");
  }
  return (
    <>
      <Head>
        <title>Product Detail</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
      <div className={styles.productContainer}>
        <div className={styles.productContent}>
          <div className={styles.header}>
            <p>{productName}</p>
          </div>

          <div className={styles.productGrid}>
            <div className={styles.productImage}>
              <Image
                src={productImage}
                width={900}
                height={900}
                alt={productName || ""}
                unoptimized
              />{" "}
            </div>

            <div className={styles.description}>
              <div className={styles.header}>
                <h1>{productName}</h1>
              </div>

              <div className={styles.price}>
                <p>Ghc</p>
                <p>{productPrice}</p>
              </div>

              <div className={styles.availability}>
                <p>Availability: In stock</p>
              </div>

              <hr />

              <div className={styles.overview}>
                <h1>Description</h1>

                <p>{productDescription}</p>
              </div>

              <div className={styles.actionBtn}>
                <FavoriteBorderIcon className={styles.icon} onClick={AddCart} />
                <AddShoppingCartIcon className={styles.icon} />
                <PaymentIcon className={styles.icon} />
              </div>
            </div>
          </div>

          <div className={styles.review}>
            <div className={styles.header}>
              <h1>Reviews</h1>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default ProductDetail;
