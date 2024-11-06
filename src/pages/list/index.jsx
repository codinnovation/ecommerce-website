import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "../layout";
import styles from "../../styles/list.module.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { ref, get } from "firebase/database";
import { db } from "../../../firebase.config";
import { Toaster, toast } from "react-hot-toast";

function List() {
  const router = useRouter();
  const { category, title } = router.query;
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        setUser(data?.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const dbRef = ref(db, `products/${category}`);
        const response = await get(dbRef);
        const data = response.val();

        if (data && typeof data === "object") {
          const dataArray = Object.entries(data).map(([key, value]) => ({
            key,
            ...value
          }));
          setProductData(dataArray);
          setIsLoading(false);
        } else {
          setProductData([]);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setProductData([]);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("darlingtonCarts")) || [];
    cart.push(product);
    localStorage.setItem("darlingtonCarts", JSON.stringify(cart));
    toast.success(`${product?.productName} added to cart`);
  };

  const addFav = (product) => {
    const cart = JSON.parse(localStorage.getItem("darlingtonFavs")) || [];
    cart.push(product);
    localStorage.setItem("darlingtonFavs", JSON.stringify(cart));
    toast.success(`${product?.productName} added to cart`);
  };

  return (
    <>
      {isLoading && (
        <>
          <div className={styles.loadingContainer}>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        </>
      )}
      <Layout />
      <div className={styles.categoryContainer}>
        <div className={styles.categoryContent}>
          <div className={styles.header}>
            <h1>{title}</h1>

            <div className={styles.navigation}>
              <ArrowBackIcon className={styles.icon} />
              <ArrowForwardIcon className={styles.icon} />
            </div>
          </div>

          <div className={styles.productGrid}>
            {productData.slice(0, 5).map((product, index) => (
              <div className={styles.product} key={index}>
                <div
                  className={styles.productImage}
                  onClick={() =>
                    router.push({
                      pathname: "/product-detail",
                      query: {
                        productName: product.productName,
                        productPrice: product.productPrice,
                        productImage: product.productImage,
                        productDescription: product.productDescription
                      }
                    })
                  }
                >
                  <Image
                    src={product?.productImage}
                    width={900}
                    height={900}
                    alt={product.productName || ""}
                    unoptimized
                  />
                </div>

                <div className={styles.productName}>
                  <h1>{product?.productName}</h1>
                </div>

                <div className={styles.productPrice}>
                  <h1>{product?.productPrice}</h1>
                </div>

                <div className={styles.actions}>
                  <AddShoppingCartIcon
                    className={styles.icon}
                    onClick={() => addToCart(product)}
                  />

                  {(user &&
                    user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) ||
                    (user &&
                      user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL2 && (
                        <>
                          <DeleteIcon className={styles.icon} />
                          <EditIcon className={styles.icon} />
                        </>
                      ))}

                  <FavoriteBorderIcon className={styles.icon} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default List;
