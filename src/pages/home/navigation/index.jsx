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

function Navigation() {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [buyModal, setBuyModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [first_name, setFirst_Name] = useState("");
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
          phone: phone
        },
        products: cartItems.filter(
          (item) => item.productPrice === selectedAmount
        ),
        totalAmount: amount / 100,
        paymentInfo: {
          transactionRef: response.reference,
          status: response.status,
          paymentMethod: "Paystack",
          amountPaid: amount / 100,
          currency: "GHS"
        },
        orderDate: new Date().toISOString()
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

            <Link href="/shop" className={getActiveClass("/")}>
              Electronics
            </Link>
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

          {/* Menu items here... */}
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
