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
import { ref, get, remove, update } from "firebase/database";
import { db } from "../../../firebase.config";

function List() {
  const router = useRouter();
  const { category, title } = router.query;
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null); // To track the product being edited

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
        } else {
          setProductData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [category]);

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

  // Delete function
  const handleDelete = async (productKey) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const dbRef = ref(db, `products/${category}/${productKey}`);
        await remove(dbRef);
        setProductData(
          productData.filter((product) => product.key !== productKey)
        );
        alert("Product deleted successfully.");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // Edit function
  const handleEdit = (product) => {
    setEditingProduct(product); // Set the product being edited
  };

  const handleSaveEdit = async (productKey, updatedProduct) => {
    try {
      const dbRef = ref(db, `products/${category}/${productKey}`);
      await update(dbRef, updatedProduct);
      setProductData(
        productData.map((product) =>
          product.key === productKey
            ? { ...product, ...updatedProduct }
            : product
        )
      );
      setEditingProduct(null); // Close the edit form
      alert("Product updated successfully.");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      {isLoading && (
        <div className={styles.loadingContainer}>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
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
            {productData.slice(0, 5).map((product) => (
              <div className={styles.product} key={product.key}>
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

                {editingProduct?.key === product.key ? (
                  <div className={styles.editForm}>
                    <input
                      type="text"
                      value={editingProduct.productName}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          productName: e.target.value
                        })
                      }
                      placeholder="Product Name"
                    />
                    <input
                      type="text"
                      value={editingProduct.productPrice}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          productPrice: e.target.value
                        })
                      }
                      placeholder="Product Price"
                    />
                    <input
                      type="text"
                      value={editingProduct.productDescription}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          productDescription: e.target.value
                        })
                      }
                      placeholder="Product Description"
                    />
                    <button
                      onClick={() =>
                        handleSaveEdit(product.key, editingProduct)
                      }
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className={styles.actions}>
                    <AddShoppingCartIcon className={styles.icon} />
                    {user && user.displayName === "Kwabena" && (
                      <>
                        <DeleteIcon
                          className={styles.icon}
                          onClick={() => handleDelete(product.key)}
                        />
                        <EditIcon
                          className={styles.icon}
                          onClick={() => handleEdit(product)}
                        />
                      </>
                    )}
                    <FavoriteBorderIcon className={styles.icon} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default List;
