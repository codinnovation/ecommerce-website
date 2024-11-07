import React, { useEffect, useState } from "react";
import Layout from "@/pages/admin-page/layout";
import styles from "../../../styles/admin/orders.module.css";
import withSession from "@/pages/api/session";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { db } from "../../../../firebase.config";
import { ref, get } from "firebase/database";

function Orders() {
  const [ordersData, setOrdersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(ordersData);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const dbRef = ref(db, `orders`);
        const response = await get(dbRef);
        const data = response.val();

        if (data && typeof data === "object") {
          const dataArray = Object.entries(data).map(([key, value]) => ({
            key,
            ...value
          }));
          setOrdersData(dataArray);
          setIsLoading(false);
        } else {
          setOrdersData([]);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setOrdersData([]);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <div className={styles.orderContainer}>
        <div className={styles.orderContent}>
          <div className={styles.header}>
            <h1>Orders</h1>
          </div>

          <div className={styles.orderTable}>
            <div className={styles.orderTableHeader}>
              <h1>First Name</h1>
              <h1>Last Name</h1>
              <h1>Phone</h1>
              <h1>Status</h1>
            </div>
            {ordersData.map((item, index) => (
              <div className={styles.orderTableColumn} key={index}>
                <h1>{item?.customer?.firstName}</h1>
                <h1>{item?.customer?.lastName}</h1>
                <h1>{item?.customer?.phone}</h1>
                <h1>{item?.customer?.status}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  const currentPath = req ? req.url : window.location.pathname;

  if (
    (!user && user?.email !== "asomanirawlingsjunior5333@gmail.com") ||
    (!user && user?.email !== "kwabenasakyi450@gmail.com")
  ) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }
  if (user) {
    req.session.set("user", user);
    await req.session.save();
  }

  return {
    props: {
      user: user ? user : null
    }
  };
});
