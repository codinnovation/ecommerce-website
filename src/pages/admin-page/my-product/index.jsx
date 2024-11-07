import React, { useState } from "react";
import styles from "../../../styles/admin/my-product.module.css";
import { Toaster, toast } from "react-hot-toast";
import { ref, push } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import { db } from "../../../../firebase.config";

function MyProduct() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [productData, setProductData] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productImage: null,
    productCategory: ""
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "productImage" && files && files.length > 0) {
      setProductData({
        ...productData,
        productImage: files[0] // Store the image file
      });
    } else {
      setProductData({
        ...productData,
        [name]: value // Update other inputs like name, price, description
      });
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    if (
      !productData.productCategory ||
      !productData.productImage ||
      !productData.productName ||
      !productData.productPrice ||
      !productData.productDescription
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const storage = getStorage();
    const imageFile = productData.productImage;
    const categoryFolder = productData.productCategory.toLowerCase();
    const imageRef = storageRef(
      storage,
      `images/${categoryFolder}/${imageFile.name}`
    );

    const uploadTask = uploadBytesResumable(imageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
        toast.error("Image upload failed.");
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const productToSave = {
            productName: productData.productName,
            productPrice: productData.productPrice,
            productDescription: productData.productDescription,
            productImage: downloadURL,
            productCategory: productData.productCategory
          };

          await push(ref(db, `products/${categoryFolder}`), productToSave);

          toast.success("Product added successfully!");
          setProductData({
            productName: "",
            productPrice: "",
            productDescription: "",
            productImage: null,
            productCategory: ""
          });
          setUploadProgress(0);
        } catch (error) {
          console.error("Database error:", error);
          toast.error("Failed to save product.");
        }
      }
    );
  };

  return (
    <>
      <Toaster />
      <div className={styles.myproductContainer}>
        <div className={styles.myproductContent}>
          <div className={styles.header}>
            <h1>Add Product</h1>
          </div>

          <div className={styles.addContainer}>
            <form onSubmit={handleSubmitProduct}>
              <div className={styles.addGrid}>
                <div className={styles.field}>
                  <label>Product Category</label>
                  <select
                    name="productCategory"
                    value={productData.productCategory}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="Fashion">Fashion</option>
                    <option value="HomeAppliances">Home Appliances</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Sneakers">Sneakers</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Laptops">Laptops</option>
                    <option value="ApplePhones">Apple Phones</option>
                    <option value="AndroidPhone">Android Phones</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label>Product Image</label>
                  <input
                    type="file"
                    name="productImage"
                    onChange={handleInputChange}
                  />
                  {uploadProgress > 0 && (
                    <p>Upload Progress: {uploadProgress.toFixed(0)}%</p>
                  )}
                </div>

                <div className={styles.field}>
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={productData.productName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.field}>
                  <label>Product Price</label>
                  <input
                    type="number"
                    name="productPrice"
                    value={productData.productPrice}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.field}>
                  <label>Product Description</label>
                  <textarea
                    name="productDescription"
                    value={productData.productDescription}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className={styles.addBtn}>
                <button type="submit">Add Product</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProduct;
