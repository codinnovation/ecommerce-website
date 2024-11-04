import React, { useState, useEffect } from "react";
import styles from "../styles/login.module.css";
import Head from "next/head";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Toaster, toast } from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase.config";

function Email() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    displayName: ""
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    let data = {
      email: userDetails.email,
      password: userDetails.password,
      displayName: userDetails.displayName
    };

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        toast.success("Log in successfully");
        setIsLoading(false);
        router.push("/");
      } else {
        setIsLoading(false);
        toast.error("Error Log in account");
      }
    } catch (err) {
      toast.error("Error Log in account", err.message);
      setIsLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!userDetails.email) {
      toast.error("Please enter your email address");
    }
    try {
      await sendPasswordResetEmail(auth, userDetails.email);
      toast.success("Password reset email sent. Please check your email.");
    } catch (error) {
      toast.error("Error sending password reset email");
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

      <Head>
        <title>Darlington - Create with Email</title>
        <meta name="description" content="Welcome To Darlington" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.loginContainer}>
        <div className={styles.loginContent}>
          <div className={styles.closeIcon}>
            <ArrowBackIosIcon className={styles.iconArrow} />
            <CloseIcon className={styles.icon} />
          </div>
          <div className={styles.loginFormContent}>
            <div className={styles.loginHeader}>
              <h1>Create Account</h1>
            </div>

            <div className={styles.loginForm}>
              <form onSubmit={handleLogin}>
                <div className={styles.inputField}>
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.inputField}>
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder=""
                    name="displayName"
                    value={userDetails.displayName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.inputField}>
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={userDetails.password}
                    onChange={handleInputChange}
                  />{" "}
                </div>

                <div className={styles.forgetPassword}>
                  <p onClick={resetPassword}>Forget Password</p>
                </div>

                <div className={styles.loginButton}>
                  <button>Login</button>
                </div>

                <div className={styles.createAccount}>
                  <p>Don&apos;t have account?</p>
                  <p onClick={() => router.push("/login")}>Login</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Email;
