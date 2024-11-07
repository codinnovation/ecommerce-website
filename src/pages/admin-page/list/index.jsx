import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "../../../pages/admin-page/layout";
import styles from "../../../styles/admin/list.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { ref, get, update } from "firebase/database";
import { Toaster, toast } from "react-hot-toast";
import { db } from "../../../../firebase.config";

function List() {
  const router = useRouter();
  const { category, title } = router.query;
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

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

  const handleEdit = (product) => {
    setEditProduct(product);
    setIsEditMode(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const productRef = ref(db, `products/${category}/${editProduct.key}`);
      await update(productRef, {
        productName: editProduct.productName,
        productPrice: editProduct.productPrice
      });
      setProductData((prevData) =>
        prevData.map((product) =>
          product.key === editProduct.key ? editProduct : product
        )
      );
      setIsEditMode(false);
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  const handleDelete = async (productKey) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const productRef = ref(db, `products/${category}/${productKey}`);
        await productRef.remove();

        // Update local product data to remove the deleted product
        setProductData((prevData) =>
          prevData.filter((product) => product.key !== productKey)
        );

        toast.success("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product.");
      }
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
            {productData.slice(0, 5).map((product, index) => (
              <div className={styles.product} key={index}>
                <div className={styles.productImage}>
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
                  <h1>{`Ghc ${product?.productPrice}`}</h1>
                </div>
                <div className={styles.actions}>
                  <DeleteIcon
                    className={styles.icon}
                    onClick={() => handleDelete(product.key)}
                  />
                  <EditIcon
                    className={styles.icon}
                    onClick={() => handleEdit(product)}
                  />
                </div>
              </div>
            ))}
          </div>
          {isEditMode && (
            <div className={styles.editModal}>
              <h2>Edit Product</h2>
              <form onSubmit={handleSaveEdit}>
                <label>
                  Product Name:
                  <input
                    type="text"
                    value={editProduct.productName}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        productName: e.target.value
                      })
                    }
                  />
                </label>
                <label>
                  Product Price:
                  <input
                    type="text"
                    value={editProduct.productPrice}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        productPrice: e.target.value
                      })
                    }
                  />
                </label>

                <label>
                  Product Descriptions:
                  <input
                    type="text"
                    value={editProduct.productDescription}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        productDescription: e.target.value
                      })
                    }
                  />
                </label>

                <button type="submit">Save</button>
                <button type="button" onClick={() => setIsEditMode(false)}>
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default List;
