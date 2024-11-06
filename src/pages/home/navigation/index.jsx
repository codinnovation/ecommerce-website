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
import { ref, push } from "firebase/database";
import { db } from "../../../../firebase.config";
import dynamic from "next/dynamic";

// Dynamically import the PaystackButton with no SSR
const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

function Navigation({ user }) {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [buyModal, setBuyModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [first_name, setFirst_Name] = useState("");
  const [location, setLocation] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(0);
  const publicKey = process.env.NEXT_PUBLIC_PAY_STACK_API;

  const getActiveClass = (path) => {
    return router.pathname === path ? styles.activeLink : "";
  };

  const loadCartItems = () => {
    const storedCart =
      JSON.parse(localStorage.getItem("darlingtonCarts")) || [];
    setCartItems(storedCart);
  };

  const handleDeleteItem = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem("darlingtonCarts", JSON.stringify(updatedCartItems));
    toast.success("Item removed from cart!");
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  const handleBuyClick = (price) => {
    setSelectedAmount(price);
    setBuyModal(true);
  };

  const amount = selectedAmount * 100;

  const handleSaveOrderToDB = (orderDetails) => {
    const ordersRef = ref(db, "orders");
    push(ordersRef, orderDetails)
      .then(() => {
        toast.success("Order placed successfully!");
      })
      .catch((error) => {
        toast.error("Error saving order: " + error.message);
      });
  };

  const componentProps = {
    email,
    amount,
    currency: "GHS",
    phone,
    last_name,
    first_name,
    metadata: {},
    publicKey,
    text: "Proceed",
    subaccount: process.env.NEXT_PUBLIC_CUSTOMER_CODE,
    onSuccess: (response) => {
      const orderDetails = {
        customer: {
          firstName: first_name,
          lastName: last_name,
          email: email,
          phone: phone,
          location: location,
          totalAmount: amount / 100,
          transactionRef: response.reference,
          status: response.status,
          paymentMethod: "Paystack",
          amountPaid: amount / 100,
          currency: "GHS",
          orderDate: new Date().toISOString()
        }
      };
      handleSaveOrderToDB(orderDetails);

      localStorage.removeItem("darlingtonCarts");
      setCartItems([]);
      toast.success("Thanks for doing business with us! Come back soon!!");
      router.push("/");
    },

    onClose: () => toast.warning("Wait! Please don't leave")
  };

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

            {(user && user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) ||
              (user && user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL2 && (
                <Link href="/admin-page/orders" className={getActiveClass("/")}>
                  Orders
                </Link>
              ))}
            <Link href="/mobile" className={getActiveClass("/")}>
              Android
            </Link>
            <Link href="/offer" className={getActiveClass("/")}>
              Apple
            </Link>
            <Link href="/deal" className={getActiveClass("/")}>
              Sneakers
            </Link>
            <Link href="/contact" className={getActiveClass("/")}>
              Contact
            </Link>
          </div>

          <div className={styles.actions}>
            <SearchIcon className={styles.icon} />

            <div className={styles.cartContainer}>
              <AddShoppingCartIcon className={styles.icon} />
              <p>{cartItems?.length} items</p>

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
                      <button onClick={() => handleBuyClick(item.productPrice)}>
                        Buy
                      </button>
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
        <div className={styles.menu}>
          <div className={styles.closeIcon} onClick={() => setOpenMenu(false)}>
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
                query: { category: "fashion", title: "Fashion" }
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
                  category: "homeAppliances",
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
                query: { category: "shoes", title: "Shoes" }
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
                query: { category: "sneakers", title: "Sneakers" }
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
                query: { category: "laptops", title: "Laptops" }
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
                query: { category: "applePhones", title: "Apple Phones" }
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
                query: { category: "androidPhones", title: "Android Phones" }
              })
            }
          >
            <h1>8</h1>
            <h1>Android Phones</h1>
          </div>
        </div>
      )}

      {buyModal && (
        <div className={styles.buyContainer}>
          <div className={styles.buyContent}>
            <div className={styles.header}>
              <h1>Fill the spaces</h1>
            </div>

            <div className={styles.inputField}>
              <div className={styles.field}>
                <label>First Name</label>
                <input
                  value={first_name}
                  onChange={(e) => setFirst_Name(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label>Last Name</label>
                <input
                  value={last_name}
                  onChange={(e) => setLast_Name(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label>Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label>Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label>Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className={styles.actionButton}>
                <PaystackButton {...componentProps} />
                <button onClick={() => setBuyModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navigation;
