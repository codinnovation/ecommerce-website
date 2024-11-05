import React, { useState, useEffect } from "react";
import styles from "../../../styles/home/navigation.module.css";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";

function Navigation() {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [buyModal, setBuyModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const getActiveClass = (path) => {
    return router.pathname === path ? styles.activeLink : "";
  };

  const loadCartItems = () => {
    const storedCart =
      JSON.parse(localStorage.getItem("darlingtonCarts")) || [];
    setCartItems(storedCart);
  };


  useEffect(() => {
    // Load cart items initially
    loadCartItems();

    // Listen to `storage` events to update cart when localStorage changes
    const handleStorageChange = (event) => {
      if (event.key === "darlingtonCarts") {
        loadCartItems();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <div className={styles.navigationContainer}>
        <div className={styles.navigationContent}>
          <div
            className={styles.menuContainer}
            onClick={() => setOpenMenu(true)}
          >
            <MenuIcon className={styles.icon} />
            <h1>Categories</h1>
          </div>
          <div className={styles.linkContainer}>
            <Link href="/" className={getActiveClass("/")}>
              Home
            </Link>

            <Link href="/shop" className={getActiveClass("/shop")}>
              Electronics
            </Link>
            <Link href="/mobile" className={getActiveClass("/mobile")}>
              Android
            </Link>
            <Link href="/offer" className={getActiveClass("/offer")}>
              Apple
            </Link>
            <Link href="/deal" className={getActiveClass("/deal")}>
              Sneakers
            </Link>
            <Link href="/contact" className={getActiveClass("/contact")}>
              Contact
            </Link>
          </div>

          <div className={styles.actions}>
            <SearchIcon className={styles.icon} />

            <div className={styles.cartContainer}>
              <AddShoppingCartIcon className={styles.icon} />
              <p>3 items</p>

              {/* Cart content under the cart icon */}
              <div className={styles.cartContent}>
                {cartItems.map((item, index) => (
                  <div className={styles.cartItem} key={index}>
                    <div className={styles.cartItemContent}>
                      <div className={styles.cartItemPhoto}>
                        <Image
                          src={item?.productImage}
                          width={900}
                          height={900}
                          alt=""
                          unoptimized
                        />
                      </div>

                      <div className={styles.cartItemName}>
                        <h1>{item.productName}</h1>
                        <p>Ghc{item.productPrice}</p>
                      </div>
                    </div>

                    <div className={styles.cartItemButton}>
                      <button onClick={() => setBuyModal(true)}>Buy</button>
                      <button onClick={() => handleDeleteItem(index)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />

      {openMenu && (
        <>
          <div className={styles.menu}>
            <div
              className={styles.closeIcon}
              onClick={() => setOpenMenu(false)}
            >
              <CloseIcon className={styles.icon} />
            </div>

            <div
              className={styles.link}
              onClick={() =>
                router.push({
                  pathname: "/"
                })
              }
            >
              <h1>0</h1>
              <h1>Home</h1>
            </div>

            <div
              className={styles.link}
              onClick={() =>
                router.push({
                  pathname: "/list",
                  query: { category: "Fashion", title: "Fashion" }
                })
              }
            >
              <h1>1</h1>
              <h1>Fashion</h1>
            </div>

            <div
              className={styles.link}
              onClick={() =>
                router.push({
                  pathname: "/list",
                  query: {
                    category: "HomeAppliances",
                    title: "Home Appliances"
                  }
                })
              }
            >
              <h1>2</h1>
              <h1>Home Appliances</h1>
            </div>

            <div
              className={styles.link}
              onClick={() =>
                router.push({
                  pathname: "/list",
                  query: { category: "Shoes", title: "Shoes" }
                })
              }
            >
              <h1>3</h1>
              <h1>Shoes</h1>
            </div>

            <div
              className={styles.link}
              onClick={() =>
                router.push({
                  pathname: "/list",
                  query: { category: "Sneakers", title: "Sneakers" }
                })
              }
            >
              <h1>4</h1>
              <h1>Sneakers</h1>
            </div>

            <div
              className={styles.link}
              onClick={() =>
                router.push({
                  pathname: "/list",
                  query: { category: "electronics", title: "Electronics" }
                })
              }
            >
              <h1>5</h1>
              <h1>Electronics</h1>
            </div>

            <div
              className={styles.link}
              onClick={() =>
                router.push({
                  pathname: "/list",
                  query: { category: "Laptops", title: "Laptops" }
                })
              }
            >
              <h1>6</h1>
              <h1>Laptops</h1>
            </div>

            <div
              className={styles.link}
              onClick={() =>
                router.push({
                  pathname: "/list",
                  query: { category: "ApplePhones", title: "ApplePhones" }
                })
              }
            >
              <h1>7</h1>
              <h1>Apple Phones</h1>
            </div>

            <div
              className={styles.link}
              onClick={() =>
                router.push({
                  pathname: "/list",
                  query: { category: "AndroidPhone", title: "Android Phones" }
                })
              }
            >
              <h1>8</h1>
              <h1>Android Phones</h1>
            </div>
          </div>
        </>
      )}

      {buyModal && (
        <>
          <div className={styles.buyContainer}></div>
        </>
      )}
    </>
  );
}

export default Navigation;
